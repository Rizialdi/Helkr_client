const accueil = [
  {
    id: 'Maison',
    name: 'Maison',
    tag: ['Réparation', ' néttoyage'],
    image: require('../assets/icons/house.svg')
  },
  {
    id: 'Cours',
    name: 'Cours',
    tag: ['Cours de francais', ' mathématique'],
    image: require('../assets/icons/student.svg')
  },
  {
    id: 'Maison2',
    name: 'Maison',
    tag: ['Réparation', ' néttoyage'],
    image: require('../assets/icons/house.svg')
  },
  {
    id: 'Cours2',
    name: 'Cours',
    tag: ['Cours de francais', ' mathématique'],
    image: require('../assets/icons/house.svg')
  },
  {
    id: 'Maison3',
    name: 'Maison',
    tag: ['Réparation', ' néttoyage'],
    image: require('../assets/icons/house.svg')
  },
  {
    id: 'Cours3',
    name: 'Cours',
    tag: ['Cours de francais', ' mathématique'],
    image: require('../assets/icons/student.svg')
  },
  ,
  {
    id: 'Maison4',
    name: 'Maison',
    tag: ['Réparation', ' néttoyage'],
    image: require('../assets/icons/house.svg')
  },
  {
    id: 'Cours4',
    name: 'Cours',
    tag: ['Cours de francais', ' mathématique'],
    image: require('../assets/icons/student.svg')
  },
];

const discussions = [
  {
    id: 'thierry',
    name: 'Thierry D.',
    message: 'Je prends note de vos disponibilités',
    image: require('../assets/images/thierry.jpg')
  },
  {
    id: 'roland',
    name: 'Roland M.',
    message: 'Désolé du dérangement',
    image: require('../assets/images/roland.jpg')
  },
  {
    id: 'Anais',
    name: 'Anais B.',
    message: 'Je vis à deux pas du centre social',
    image: require('../assets/images/anais.jpg')
  },
  {
    id: 'benoit',
    name: 'Benoit K.',
    message: "J'ai déja fait de la soudure",
    image: require('../assets/images/benoit.jpg')
  }
]

const profile = {
  username: 'Anais B.',
  address: 'Cité de la démocratie',
  stars: 5,
  count: 20,
  image: require('../assets/images/anais.jpg'),
  tags: ['Cours de francais', ', Repassage'],
  description: "Après ma seconde année à l’école de gestion, j’ai décidé d’aider les personnes agées. Je le fais maintenant depuis 3 ans. Je peux vous assurer que je traitrerais votre parent comme le mien. A très bientot, je l’espère.",
  avis: [
    {
    name: 'Leon S.',
    tag: 'Cours de piano',
    stars: 5,
    evaluation: "J’ai pris Anais pour donner des cours à mon fils de 10 ans. Je suis convaincu qu’elle à un don pour cela."
   },
    {
      name: 'Brigitte K.',
      tag: 'Cours de francais',
      stars: 4,
      evaluation: "Le niveau de ma fille ne cesse de progresser de semaine en semaine. Merci encore à toi."
    },
    {
      name: 'Carine B.',
      tag: 'Cours de francais',
      stars: 5,
      evaluation: "Je lui aurait bien mis un 6/5 lol. Plus serieusement, Anais est une fille patiente et toujours pontuelle."
    },
    {
      name: 'Marina E.',
      tag: 'Cours de piano',
      stars: 4,
      evaluation: "J’ai pris Anais pour donner des cours à mon fils de 10 ans. Je suis convaincu qu’elle à un don pour cela."
    },
    {
      name: 'Eleonore M.',
      tag: 'Cours de francais',
      stars: 5,
      evaluation: "Le niveau de ma fille ne cesse de progresser de semaine en semaine. Merci encore à toi."
    },
]
}
export {
  accueil,
  discussions,
  profile
}