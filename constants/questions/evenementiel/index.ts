import photographie from './photographie';
import weddingPlanner from './weddingPlanner';
import cusine from './cusine';
import fleuriste from './fleuriste';

export default {
  id: 'Evenementiel',
  name: 'Evenementiel',
  tag: {
    Cuisine: cusine,
    Fleuriste: fleuriste,
    Photographie: photographie,
    'Wedding planner': weddingPlanner,
  },
  image: 'event'
};
