import {
  bodycare,
  course,
  evenementiel,
  homehelp,
  house,
  ideas,
  multimedia,
  transportsEtlivraison
} from './questions';

const listeDePieces = [
  {
    id: 1,
    label: 'identite',
    titre: "Une carte d'identité / séjour en cours de validité",
    description: 'afin de confirmer votre identité.'
  },
  {
    id: 2,
    label: 'casierjudiciaire',
    titre: 'Un casier judiciaire',
    description: ''
  },
  {
    id: 3,
    label: 'attestationhonneur',
    titre: "Une attestation sur l'honneur",
    description: ''
  },
  {
    id: 4,
    label: 'certificat',
    titre: 'Un certificat de professionalisation',
    description: 'afin de garantir le service proposé au client'
  },
  {
    id: 5,
    label: 'diplome',
    titre: 'Le diplome le plus haut',
    description: ''
  },
  {
    id: 6,
    label: 'honneur',
    titre: "Une attestation sur l'honneur",
    description: ''
  }
];

const accueil = [
  house,
  course,
  homehelp,
  bodycare,
  evenementiel,
  multimedia,
  transportsEtlivraison,
  ideas
];

export const getListofPieces = (id: string | null = '') => {
  if (!id) return;
  const matchingCategory = accueil.find(({ tag }) => {
    return Object.values(tag).find(value => value?.referenceId === id);
  });
  const matchingItem = matchingCategory
    ? Object.values(matchingCategory.tag).filter(i => i?.referenceId === id)[0]
    : { pieces: '' };
  const toReturn = listeDePieces.filter(({ id }) => {
    return matchingItem && matchingItem?.pieces?.includes(id as never);
  });
  return toReturn;
};

export const getItemNameOnReferenceId = (
  referenceId: string | null = ''
): string => {
  if (!referenceId) return '';
  const matchingCategory = accueil.find(({ tag }) => {
    return Object.values(tag).find(value => value?.referenceId === referenceId);
  });

  if (!matchingCategory) return '';
  const matchingItem = Object.values([matchingCategory?.tag])[0];

  if (!matchingItem) return '';
  const result = Object.entries(matchingItem).filter(
    ([_, value]) => value.referenceId === referenceId
  );

  return result[0][0];
};

const illustrations = [
  {
    id: 1,
    textP: 'Formulez votre demande de services',
    textS:
      'Repondez à un simple formulaire pour preciser votre demande de services'
  },
  {
    id: 2,
    textP: 'Recevez des propositions de professionels',
    textS:
      'Chaque agent vous presente un proposition en fonction de vos reponses au formulaire'
  },
  {
    id: 3,
    textP: "Faites le choix d'un prestataire",
    textS:
      'Les avis d’autres utilisateurs permettent de vous faire une idée du prestataire et de sa fiabilité'
  },
  {
    id: 4,
    textP: 'Regler le montant de la prestation',
    textS:
      "Notez que votre paiement n'est percu par le prestataire qu'une fois le service realisé"
  },
  {
    id: 5,
    textP: 'Votre avis nous interesse',
    textS:
      'Evaluer le prestataire sur le service effectué en donnant votre avis et une note'
  }
];

export { accueil, illustrations };
