export default {
  number: {
    required: { value: true, message: 'Numéro obligatoire' },
    minLength: { value: 13, message: 'Numéro trop court' },
    maxLength: { value: 13, message: 'Numéro trop long' }
  },
  nom: {
    required: { value: true, message: 'Nom obligatoire' },
    minLength: { value: 3, message: '3 caractères minimum' },
    maxLength: { value: 20, message: '20 caractères maximum' }
  },
  prenom: {
    required: { value: true, message: 'Prénom obligatoire' },
    minLength: { value: 3, message: '3 caractères minimum' },
    maxLength: { value: 20, message: '20 caractères maximum' }
  },
  verificationCode: {
    required: { value: true, message: 'Code obligatoire' },
    minLength: { value: 6, message: 'Code trop court' },
    maxLength: { value: 6, message: 'Code trop long' }
  }
};

export type FormData = {
  number: string;
  nom: string;
  prenom: string;
  verificationCode: string;
};
