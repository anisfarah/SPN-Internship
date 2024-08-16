'use server';
import useFetch from '@/hooks/useFetch';
import { cookies } from 'next/headers';

const AddPenalty = async (penaltyData: any) => {
  const url = `http://localhost:8000/AddPenalty`;

  const { response, status } = await useFetch(url, {
    method: 'POST',
    body: JSON.stringify(penaltyData),  // Send the structured JSON object directly
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const resolvedStatus = status ?? 500;  // Default to 500 if status is null or undefined

  if (resolvedStatus >= 400 || response?.error) {
    return {
      status: resolvedStatus,
      alert: response?.error || 'Something went wrong, please try again later'
    };
  }

  return { status: resolvedStatus, alert: response?.message || 'Penalty added successfully' };
};

const UpdatePenaltyInfo = async (penaltyData: any, penaltyId: string) => {
  const url = `${process.env.SERVER_USERS}/v1/penalties/updateInfo/${penaltyId}`;
  const accessToken = cookies().get('accessToken')?.value;

  const { response, status } = await useFetch(url, {
    method: 'PUT',
    body: JSON.stringify(penaltyData),  // Send the structured JSON object directly
    headers: {
      Cookie: `accessToken=${accessToken};`,
      'Content-Type': 'application/json'
    }
  });

  const resolvedStatus = status ?? 500;

  if (resolvedStatus >= 400 || response?.error) {
    return {
      status: resolvedStatus,
      alert: response?.error || 'Something went wrong, please try again later'
    };
  }

  return { status: resolvedStatus, alert: response?.message || 'Penalty information updated successfully' };
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

  const resolvedStatus = status ?? 500;

  if (resolvedStatus >= 400 || response?.error) {
    return {
      status: resolvedStatus,
      alert: response?.error || 'Something went wrong, please try again later'
    };
  }

  return { response, alert: response?.message || 'Penalties retrieved successfully' };
};

export {
  AddPenalty,
  UpdatePenaltyInfo,
  FindAllPenalties
};
