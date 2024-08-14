// src/forms/penalties/uploadPenalty.config.ts
export const getUploadPenaltyConfig = async () => {
    return [
      {
        label: 'Penalty Document',
        type: 'file',
        required: true,
        name: 'penaltyDocument',
      },
    ]; 
  };
  