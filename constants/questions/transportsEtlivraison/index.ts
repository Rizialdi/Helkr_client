import livraison from './livraison';
import transport from './transport';
import demenagement from './demenagement';

export default {
  id: 'Transports',
  name: 'Transports',
  tag: {
    Livraison: livraison,
    Transport: transport,
    Démenagement: demenagement,
  },
  image: 'transport'
};
