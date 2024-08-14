'use server';
import useFetch from '@/hooks/useFetch';
import { cookies } from 'next/headers';

const AddPenalty = async (penaltyData: any) => {
  const url = `${process.env.SERVER_USERS}/v1/penalties/`;
  const accessToken = cookies().get('accessToken')?.value;

  const { response, status } = await useFetch(url, {
    method: 'POST',
    body: JSON.stringify({ penaltyData }),
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

export {
  AddPenalty,
  UpdatePenaltyInfo,
  FindAllPenalties
};
