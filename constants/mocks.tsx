import { CategoriesInterface } from '../screens/Accueil/components/Interfaces';
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

const listeDePiecesObligatoires = [1, 2];
const accueil: CategoriesInterface = [
  {
    id: 'Maison',
    name: 'Maison',
    tag: {
      Réparation: {
        referenceId: 'cb92efe392377fce4c29e18a820b2019',
        pieces: [...listeDePiecesObligatoires, 1, 3],
        detailQuestions: {
          foyer: [
            { label: 'foyer1', value: 'foyer 1' },
            { label: 'foyer2', value: 'foyer2' }
          ],
          assiette: [
            { label: 'assiette1', value: 'assiette1' },
            { label: 'assiette2', value: 'assiette2' }
          ],
          tomate: [
            { label: 'tomate1', value: 'tomate1' },
            { label: 'tomate2', value: 'tomate2' }
          ],
          marmite: [
            { label: 'bool', value: 'bool' },
            { label: 'bool', value: 'bbol' }
          ],
          foyer2: [
            { label: 'foyer1', value: 'foyer 1' },
            { label: 'foyer2', value: 'foyer2' }
          ],
          assiette2: [
            { label: 'assiette1', value: 'assiette1' },
            { label: 'assiette2', value: 'assiette2' }
          ],
          tomate2: [
            { label: 'tomate1', value: 'tomate1' },
            { label: 'tomate2', value: 'tomate2' }
          ],
          marmite2: [
            { label: 'bool', value: 'bool' },
            { label: 'bool', value: 'bbol' }
          ]
        }
      },
      Néttoyage: {
        referenceId: '660c0b9df522d1c7a442640e91592730',
        pieces: [...listeDePiecesObligatoires, 1, 3, 4],
        detailQuestions: {
          Utilite: [
            { label: 'balai 1', value: 'balai 1' },
            { label: 'serpiere 2', value: 'serpiere 2' }
          ],
          frequence: [
            { label: '1 fois par semaine', value: '1 fois par semaine' },
            { label: '4 fois par semaine', value: '4 fois par semaine' }
          ],
          description: [
            { label: 'description 1', value: 'description 1' },
            { label: 'description 2', value: 'description 2' }
          ],
          marmite: [
            { label: 'bool', value: 'bool' },
            { label: 'bool', value: 'bbol' }
          ]
        }
      },
      Réttoyage: {
        referenceId: '660c0b9df522d1c7a442640e91592730',
        pieces: [...listeDePiecesObligatoires, 1, 3, 4],
        detailQuestions: {
          Utilite: [
            { label: 'balai 1', value: 'balai 1' },
            { label: 'serpiere 2', value: 'serpiere 2' }
          ],
          frequence: [
            { label: '1 fois par semaine', value: '1 fois par semaine' },
            { label: '4 fois par semaine', value: '4 fois par semaine' }
          ],
          description: [
            { label: 'description 1', value: 'description 1' },
            { label: 'description 2', value: 'description 2' }
          ],
          marmite: [
            { label: 'bool', value: 'bool' },
            { label: 'bool', value: 'bbol' }
          ]
        }
      }
    },
    image: 'house'
  },
  {
    id: 'Maison2',
    name: 'Maison2',
    tag: {
      Réparation: {
        referenceId: 'cb92efe392377fce4c29e18a820b2019',
        pieces: [...listeDePiecesObligatoires, 1, 3],
        detailQuestions: {
          foyer: [
            { label: 'foyer1', value: 'foyer 1' },
            { label: 'foyer2', value: 'foyer2' }
          ],
          assiette: [
            { label: 'assiette1', value: 'assiette1' },
            { label: 'assiette2', value: 'assiette2' }
          ],
          tomate: [
            { label: 'tomate1', value: 'tomate1' },
            { label: 'tomate2', value: 'tomate2' }
          ],
          marmite: [
            { label: 'bool', value: 'bool' },
            { label: 'bool', value: 'bbol' }
          ],
          foyer2: [
            { label: 'foyer1', value: 'foyer 1' },
            { label: 'foyer2', value: 'foyer2' }
          ],
          assiette2: [
            { label: 'assiette1', value: 'assiette1' },
            { label: 'assiette2', value: 'assiette2' }
          ],
          tomate2: [
            { label: 'tomate1', value: 'tomate1' },
            { label: 'tomate2', value: 'tomate2' }
          ],
          marmite2: [
            { label: 'bool', value: 'bool' },
            { label: 'bool', value: 'bbol' }
          ]
        }
      },
      Néttoyage: {
        referenceId: '660c0b9df522d1c7a442640e91592730',
        pieces: [...listeDePiecesObligatoires, 1, 3, 4],
        detailQuestions: {
          Utilite: [
            { label: 'balai 1', value: 'balai 1' },
            { label: 'serpiere 2', value: 'serpiere 2' }
          ],
          frequence: [
            { label: '1 fois par semaine', value: '1 fois par semaine' },
            { label: '4 fois par semaine', value: '4 fois par semaine' }
          ],
          description: [
            { label: 'description 1', value: 'description 1' },
            { label: 'description 2', value: 'description 2' }
          ],
          marmite: [
            { label: 'bool', value: 'bool' },
            { label: 'bool', value: 'bbol' }
          ]
        }
      }
    },
    image: 'house'
  },
  {
    id: 'Maison3',
    name: 'Maison3',
    tag: {
      Réparation: {
        referenceId: 'cb92efe392377fce4c29e18a820b2019',
        pieces: [...listeDePiecesObligatoires, 1, 3],
        detailQuestions: {
          foyer: [
            { label: 'foyer1', value: 'foyer 1' },
            { label: 'foyer2', value: 'foyer2' }
          ],
          assiette: [
            { label: 'assiette1', value: 'assiette1' },
            { label: 'assiette2', value: 'assiette2' }
          ],
          tomate: [
            { label: 'tomate1', value: 'tomate1' },
            { label: 'tomate2', value: 'tomate2' }
          ],
          marmite: [
            { label: 'bool', value: 'bool' },
            { label: 'bool', value: 'bbol' }
          ],
          foyer2: [
            { label: 'foyer1', value: 'foyer 1' },
            { label: 'foyer2', value: 'foyer2' }
          ],
          assiette2: [
            { label: 'assiette1', value: 'assiette1' },
            { label: 'assiette2', value: 'assiette2' }
          ],
          tomate2: [
            { label: 'tomate1', value: 'tomate1' },
            { label: 'tomate2', value: 'tomate2' }
          ],
          marmite2: [
            { label: 'bool', value: 'bool' },
            { label: 'bool', value: 'bbol' }
          ]
        }
      },
      Néttoyage: {
        referenceId: '660c0b9df522d1c7a442640e91592730',
        pieces: [...listeDePiecesObligatoires, 1, 3, 4],
        detailQuestions: {
          Utilite: [
            { label: 'balai 1', value: 'balai 1' },
            { label: 'serpiere 2', value: 'serpiere 2' }
          ],
          frequence: [
            { label: '1 fois par semaine', value: '1 fois par semaine' },
            { label: '4 fois par semaine', value: '4 fois par semaine' }
          ],
          description: [
            { label: 'description 1', value: 'description 1' },
            { label: 'description 2', value: 'description 2' }
          ],
          marmite: [
            { label: 'bool', value: 'bool' },
            { label: 'bool', value: 'bbol' }
          ]
        }
      }
    },
    image: 'house'
  },
  {
    id: 'Cours',
    name: 'Cours',
    tag: {
      Réparation: {
        referenceId: 'cb92efe392377fce4c29e18a820b2019',
        pieces: [...listeDePiecesObligatoires, 1, 3],
        detailQuestions: {
          foyer: [
            { label: 'foyer1', value: 'foyer 1' },
            { label: 'foyer2', value: 'foyer2' }
          ],
          assiette: [
            { label: 'assiette1', value: 'assiette1' },
            { label: 'assiette2', value: 'assiette2' }
          ],
          tomate: [
            { label: 'tomate1', value: 'tomate1' },
            { label: 'tomate2', value: 'tomate2' }
          ],
          marmite: [
            { label: 'bool', value: 'bool' },
            { label: 'bool', value: 'bbol' }
          ],
          foyer2: [
            { label: 'foyer1', value: 'foyer 1' },
            { label: 'foyer2', value: 'foyer2' }
          ],
          assiette2: [
            { label: 'assiette1', value: 'assiette1' },
            { label: 'assiette2', value: 'assiette2' }
          ],
          tomate2: [
            { label: 'tomate1', value: 'tomate1' },
            { label: 'tomate2', value: 'tomate2' }
          ],
          marmite2: [
            { label: 'bool', value: 'bool' },
            { label: 'bool', value: 'bbol' }
          ]
        }
      },
      Néttoyage: {
        referenceId: '660c0b9df522d1c7a442640e91592730',
        pieces: [...listeDePiecesObligatoires, 1, 3, 4],
        detailQuestions: {
          Utilite: [
            { label: 'balai 1', value: 'balai 1' },
            { label: 'serpiere 2', value: 'serpiere 2' }
          ],
          frequence: [
            { label: '1 fois par semaine', value: '1 fois par semaine' },
            { label: '4 fois par semaine', value: '4 fois par semaine' }
          ],
          description: [
            { label: 'description 1', value: 'description 1' },
            { label: 'description 2', value: 'description 2' }
          ],
          marmite: [
            { label: 'bool', value: 'bool' },
            { label: 'bool', value: 'bbol' }
          ]
        }
      }
    },
    image: 'student'
  },
  {
    id: 'Cours2',
    name: 'Cours2',
    tag: {
      Réparation: {
        referenceId: 'cb92efe392377fce4c29e18a820b2019',
        pieces: [...listeDePiecesObligatoires, 1, 3],
        detailQuestions: {
          foyer: [
            { label: 'foyer1', value: 'foyer 1' },
            { label: 'foyer2', value: 'foyer2' }
          ],
          assiette: [
            { label: 'assiette1', value: 'assiette1' },
            { label: 'assiette2', value: 'assiette2' }
          ],
          tomate: [
            { label: 'tomate1', value: 'tomate1' },
            { label: 'tomate2', value: 'tomate2' }
          ],
          marmite: [
            { label: 'bool', value: 'bool' },
            { label: 'bool', value: 'bbol' }
          ],
          foyer2: [
            { label: 'foyer1', value: 'foyer 1' },
            { label: 'foyer2', value: 'foyer2' }
          ],
          assiette2: [
            { label: 'assiette1', value: 'assiette1' },
            { label: 'assiette2', value: 'assiette2' }
          ],
          tomate2: [
            { label: 'tomate1', value: 'tomate1' },
            { label: 'tomate2', value: 'tomate2' }
          ],
          marmite2: [
            { label: 'bool', value: 'bool' },
            { label: 'bool', value: 'bbol' }
          ]
        }
      },
      Néttoyage: {
        referenceId: '660c0b9df522d1c7a442640e91592730',
        pieces: [...listeDePiecesObligatoires, 1, 3, 4],
        detailQuestions: {
          Utilite: [
            { label: 'balai 1', value: 'balai 1' },
            { label: 'serpiere 2', value: 'serpiere 2' }
          ],
          frequence: [
            { label: '1 fois par semaine', value: '1 fois par semaine' },
            { label: '4 fois par semaine', value: '4 fois par semaine' }
          ],
          description: [
            { label: 'description 1', value: 'description 1' },
            { label: 'description 2', value: 'description 2' }
          ],
          marmite: [
            { label: 'bool', value: 'bool' },
            { label: 'bool', value: 'bbol' }
          ]
        }
      }
    },
    image: 'student'
  },
  {
    id: 'Cours3',
    name: 'Cours3',
    tag: {
      Réparation: {
        referenceId: 'cb92efe392377fce4c29e18a820b2019',
        pieces: [...listeDePiecesObligatoires, 1, 3],
        detailQuestions: {
          foyer: [
            { label: 'foyer1', value: 'foyer 1' },
            { label: 'foyer2', value: 'foyer2' }
          ],
          assiette: [
            { label: 'assiette1', value: 'assiette1' },
            { label: 'assiette2', value: 'assiette2' }
          ],
          tomate: [
            { label: 'tomate1', value: 'tomate1' },
            { label: 'tomate2', value: 'tomate2' }
          ],
          marmite: [
            { label: 'bool', value: 'bool' },
            { label: 'bool', value: 'bbol' }
          ],
          foyer2: [
            { label: 'foyer1', value: 'foyer 1' },
            { label: 'foyer2', value: 'foyer2' }
          ],
          assiette2: [
            { label: 'assiette1', value: 'assiette1' },
            { label: 'assiette2', value: 'assiette2' }
          ],
          tomate2: [
            { label: 'tomate1', value: 'tomate1' },
            { label: 'tomate2', value: 'tomate2' }
          ],
          marmite2: [
            { label: 'bool', value: 'bool' },
            { label: 'bool', value: 'bbol' }
          ]
        }
      },
      Néttoyage: {
        referenceId: '660c0b9df522d1c7a442640e91592730',
        pieces: [...listeDePiecesObligatoires, 1, 3, 4],
        detailQuestions: {
          Utilite: [
            { label: 'balai 1', value: 'balai 1' },
            { label: 'serpiere 2', value: 'serpiere 2' }
          ],
          frequence: [
            { label: '1 fois par semaine', value: '1 fois par semaine' },
            { label: '4 fois par semaine', value: '4 fois par semaine' }
          ],
          description: [
            { label: 'description 1', value: 'description 1' },
            { label: 'description 2', value: 'description 2' }
          ],
          marmite: [
            { label: 'bool', value: 'bool' },
            { label: 'bool', value: 'bbol' }
          ]
        }
      }
    },
    image: 'student'
  }
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

const illustrations = [
  { id: 1 },
  {
    id: 2,
    source: require('../assets/icons/phone1.svg'),
    textP: 'Formulez votre demande de services',
    textS:
      'Repondez à un simple formulaire pour preciser votre demande de services'
  },
  {
    id: 3,
    source: require('../assets/icons/phone1-1.svg'),
    textP: 'Obtenez des suggestions de profil',
    textS:
      'Les avis d’autres utilisateurs permettent de vous faire une idée de l’agent'
  },
  {
    id: 4,
    source: require('../assets/icons/phone1-2.svg'),
    textP: 'Convenez d’un lieu de rendez-vous',
    textS:
      'Repondez à un simple formulaire pour preciser votre demande de services'
  },
  {
    id: 5,
    source: require('../assets/icons/phone1-2.svg'),
    textP: 'Convenez d’un lieu de rendez-vous',
    textS:
      'Repondez à un simple formulaire pour preciser votre demande de services'
  }
];
export { accueil, illustrations };
