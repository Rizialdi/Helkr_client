import gql from 'graphql-tag';
import { demande } from '../fragments';

export default gql`
  query demandesrecues {
    demandesrecues {
      ...demande
      sentBy {
        nom
        prenom
        avatar
        numero
        address
      }
    }
  }
  ${demande}
`;
