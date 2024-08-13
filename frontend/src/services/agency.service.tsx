'use server';
import useFetch from '@/hooks/useFetch';
import { cookies } from 'next/headers';

const FindAllAgencies = async (queryParams: Record<string, string[]>) => {
  const queryString = new URLSearchParams();

  for (const key in queryParams) {
    if (Array.isArray(queryParams[key])) {
      queryParams[key].forEach((value: string) => queryString.append(key, value));
    } else {
      queryString.append(key, queryParams[key]);
    }
  }
  const accessToken = cookies().get('accessToken')?.value;

  const url = `${process.env.SERVER_USERS}/v1/agencies/?${queryString.toString()}`;

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
const FindAgencyBySlug = async (name: string) => {
  const accessToken = cookies().get('accessToken')?.value;

  const url = `${process.env.SERVER_USERS}/v1/agencies/${name}`;

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
const GetAgencyCatalog = async () => {
  const accessToken = cookies().get('accessToken')?.value;

  const url = `${process.env.SERVER_USERS}/v1/agencies/agencyCatalog`;

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

const AddAgency = async (agencyData: any) => {
  const url = `${process.env.SERVER_USERS}/v1/agencies/`;
  const accessToken = cookies().get('accessToken')?.value;

  const { response, status } = await useFetch(url, {
    method: 'POST',
    body: JSON.stringify({ agencyData }),
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
const UpdateAgencyInfo = async (agencyData: any, agencyId: string) => {
  const url = `${process.env.SERVER_USERS}/v1/agencies/updateInfo/${agencyId}`;
  const accessToken = cookies().get('accessToken')?.value;

  const { response, status } = await useFetch(url, {
    method: 'PUT',
    body: JSON.stringify(agencyData),
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
const AddComment = async (comment: any, agencyId: string) => {
  const url = `${process.env.SERVER_USERS}/v1/agencies/addComment/${agencyId}`;
  const accessToken = cookies().get('accessToken')?.value;

  const { response, status } = await useFetch(url, {
    method: 'PUT',
    body: JSON.stringify({ comment }),
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
const AddLocation = async (location: any, agencyId: string) => {
  const url = `${process.env.SERVER_USERS}/v1/agencies/addLocation/${agencyId}`;
  const accessToken = cookies().get('accessToken')?.value;

  const { response, status } = await useFetch(url, {
    method: 'PUT',
    body: JSON.stringify({ location }),
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
const EditLocation = async (location: any, locationIndex: number | string, agencyId: string) => {
  const url = `${process.env.SERVER_USERS}/v1/agencies/editLocation/${agencyId}`;
  const accessToken = cookies().get('accessToken')?.value;

  const { response, status } = await useFetch(url, {
    method: 'PUT',
    body: JSON.stringify({ location, locationIndex }),
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
const DeleteLocation = async (locationIndex: number | string, agencyId: string) => {
  const url = `${process.env.SERVER_USERS}/v1/agencies/deleteLocation/${agencyId}`;
  const accessToken = cookies().get('accessToken')?.value;

  const { response, status } = await useFetch(url, {
    method: 'PUT',
    body: JSON.stringify({ locationIndex }),
    headers: {
      Cookie: `accessToken=${accessToken};`,
      'Content-Type': 'application/json'
    }
  });
  if (response?.error) {
    return {
      status,
      alert: `${response?.error || 'Something went wrong, please try again later'}`,
      res: null
    };
  }

  return { response, status, alert: response?.message || response?.error };
};
export {
  FindAllAgencies,
  GetAgencyCatalog,
  AddLocation,
  AddAgency,
  FindAgencyBySlug,
  UpdateAgencyInfo,
  EditLocation,
  DeleteLocation,
  AddComment
};
