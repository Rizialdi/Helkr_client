import gql from 'graphql-tag';
import { demande } from '../fragments';

export default gql`
  subscription NewDemande($recipientId: String!) {
    newDemande(recipientId: $recipientId) {
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
