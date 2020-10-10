import ordinateur from './ordinateur';
import smartphoneEttablette from './smartphone';
import television from './television';
import tablette from './tablette';
import smartphone from './smartphone';

export default {
  id: 'Multimedia',
  name: 'Multimédia',
  tag: {
    Ordinateur: ordinateur,
    Smartphone: smartphone,
    Tablette: tablette,
    Télévision: television
  },
  image: 'multimedia'
};
