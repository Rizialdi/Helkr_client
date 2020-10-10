import graphismeEtdesign from './graphismeEtdesign';
import marketingdigital from './marketingdigital';
import programmationEttech from './programmationEttech';
import business from './business';
import redactionEttraduction from './redactionEttraduction';

export default {
  id: 'Course',
  name: 'Cours & Conseils',
  tag: {
    'Graphisme & Design': graphismeEtdesign,
    'Marketing Digital': marketingdigital,
    'Programmation & Tech': programmationEttech,
    Business: business,
    'Rédaction & Traduction': redactionEttraduction
  },
  image: 'course'
};
