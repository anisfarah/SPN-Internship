'use server';
import useFetch from '@/hooks/useFetch';
import { cookies } from 'next/headers';



interface ExtractTextResponse {
  extracted_text?: string;
}


const AddPenalty = async (penaltyData: any) => {
  const url = 'http://127.0.0.1:8000/AddPenalty'; 
  const accessToken = cookies().get('accessToken')?.value;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(penaltyData),
      headers: {
        Cookie: `accessToken=${accessToken};`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        status: response.status,
      };
    }

    return { status: response.status, alert: 'Penalty added successfully' };
  } catch (error) {
    console.error('Fetch error:', error);
    return { status: null, alert: 'Network error. Please try again' };
  }
};


const UpdatePenaltyInfo = async (penaltyData: any, penaltyId: string) => {
  const url = `${process.env.SERVER_USERS}/v1/penalties/updateInfo/${penaltyId}`;
  const accessToken = cookies().get('accessToken')?.value;

  const { response, status } = await useFetch(url, {
    method: 'PUT',
    body: JSON.stringify(penaltyData),
    headers: {
      Cookie: `accessToken=${accessToken};`,
      'Content-Type': 'application/json'
    }
  });
  if (response?.error) {
    return {
      status,
      alert: `${response?.error || 'Something went wrong, please try again later'}`
    };
  }

  return { status, alert: response?.message || response?.error };
};

const FindAllPenalties = async (queryParams: Record<string, string[]>) => {
  const queryString = new URLSearchParams();

  for (const key in queryParams) {
    if (Array.isArray(queryParams[key])) {
      queryParams[key].forEach((value: string) => queryString.append(key, value));
    } else {
      queryString.append(key, queryParams[key]);
    }
  }
  const accessToken = cookies().get('accessToken')?.value;

  const url = `${process.env.SERVER_USERS}/v1/penalties/?${queryString.toString()}`;

  const { response, status } = await useFetch(url, {
    method: 'GET',
    headers: {
      Cookie: `accessToken=${accessToken};`,
      'Content-Type': 'application/json'
    }
  });

  if (response?.error) {
    return {
      status,
      alert: `${response?.error || 'Something went wrong, please try again later'}`
    };
  }

  return { response, alert: response?.message || response?.error };
};

const extractDocument = async (file: File): Promise<Blob | null> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://127.0.0.1:8000/extract-document/', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to extract document: ${response.statusText}`);
    }

    const blob = await response.blob(); 
    return blob;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

const extractText = async (documentBlob: Blob): Promise<string | null> => {
  try {
    const extractedDocumentFormData = new FormData();
    extractedDocumentFormData.append('file', documentBlob, 'extracted_document.jpg');

    const response = await fetch('http://127.0.0.1:8000/extract-text/', {
      method: 'POST',
      body: extractedDocumentFormData,
    });

    if (!response.ok) {
      throw new Error(`Text extraction failed: ${response.statusText}`);
    }

    // Cast the result of response.json() to ExtractTextResponse
    const data = await response.json() as ExtractTextResponse;
    return data.extracted_text || null;
  } catch (error) {
    console.error('Text extraction error:', error);
    return null;
  }
};



export {
  AddPenalty,
  UpdatePenaltyInfo,
  FindAllPenalties,
  extractDocument,
  extractText
};
