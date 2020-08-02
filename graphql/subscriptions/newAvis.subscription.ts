import gql from 'graphql-tag';
import { avis } from '../fragments';
export default gql`
  subscription NewAvis($userId: String!) {
    newAvis(userId: $userId) {
      ...avis
    }
  }
  ${avis}
`;
