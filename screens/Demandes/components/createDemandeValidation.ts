export default {
  message: {
    required: { value: true, message: 'Message obligatoire' },
    minLength: { value: 50, message: 'Message trop court' },
    maxLength: { value: 250, message: 'Message trop long' }
  }
};

export type FormDataOffer = {
  message: string;
};
