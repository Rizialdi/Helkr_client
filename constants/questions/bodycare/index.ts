import coiffureEtbarbe from './coiffureEtbarbe';
import manucureEtpedicure from './manucureEtpedicure';
import maquillage from './maquillage';
import tatouage from './tatouage';

export default {
  id: 'bodycare',
  name: 'Soin du corps',
  tag: {
    'Coiffure & Barbe': coiffureEtbarbe,
    'Manucure & Pédicure': manucureEtpedicure,
    Maquillage: maquillage,
    Tatouage: tatouage
  },
  image: 'bodycare'
};
