import peinture from './peinture';
import revetement from './revetement';
import mobilier from './mobilier';
import decoration from './decoration';
import electricite from './electricite';
import plomberie from './plomberie';

export default {
  id: 'Maison',
  name: 'Maison',
  tag: {
    Peinture: peinture,
    Revetement: revetement,
    Plomberie: plomberie,
    Mobilier: mobilier,
    Décoration: decoration,
    Electricité: electricite
  },
  image: 'house'
};
