export default {
  message: {
    required: { value: true, message: 'Message obligatoire' },
    minLength: { value: 50, message: 'Message trop court' },
    maxLength: { value: 160, message: 'Message trop long' }
  },
  estimation: {
    required: { value: true, message: 'Estimation obligatoire' },
    minLength: { value: 8, message: 'Estimation trop courte' },
    maxLength: { value: 25, message: 'Estimation trop longue' }
  }
};

export type FormDataOffer = {
  message: string;
  estimation: string;
};
