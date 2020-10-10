import babysitting from './babysitting';
import menageEtrepassage from './menageEtrepassage';
import coutureEtretouche from './coutureEtretouche';
import serviceALapersonne from './serviceALapersonne';

export default {
  id: 'homehelp',
  name: 'Aide à domicile',
  tag: {
    Babysitting: babysitting,
    'Ménage & Repassage': menageEtrepassage,
    'Couture & Retouche': coutureEtretouche,
    'Services à la personne': serviceALapersonne
  },
  image: 'homehelp'
};
