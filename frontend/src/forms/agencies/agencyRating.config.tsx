const getAgencyRatingConfig = async (rating: any) => {
  return [
    {
      label: 'Quality fo service',
      type: 'rating',
      value: rating?.qualityOfService || 0,
      name: 'qualityOfService'
    },
    {
      label: 'Response time',
      type: 'rating',
      value: rating?.responseTime || 0,
      name: 'responseTime'
    },
    {
      label: 'Trust',
      type: 'rating',
      value: rating?.trust || 0,
      name: 'trust'
    },
    {
      label: 'Prices',
      type: 'rating',
      value: rating?.prices || 0,
      name: 'prices'
    }
  ];
};

export default getAgencyRatingConfig;
