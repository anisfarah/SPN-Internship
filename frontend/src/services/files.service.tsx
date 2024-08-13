import useFetch from '@/hooks/useFetch';
const UploadImage = async (formData: FormData) => {
  const { response, status } = await useFetch(`${process.env.SERVER_FILES}/v1/upload-image`, {
    method: 'POST',
    body: formData
  });
  if (response?.error)
    return {
      status: status || 500,
      alert: 'Something went wrong please try again later'
    };

  return { response, status };
};

const UploadGallery = async (formData: FormData) => {
  const { response, status } = await useFetch(`${process.env.SERVER_FILES}/v1/upload-gallery`, {
    method: 'POST',
    body: formData
  });

  if (response?.error) {
    return {
      status: status || 500,
      alert: 'Something went wrong please try again later'
    };
  }

  return { response, status };
};
export { UploadGallery, UploadImage };
