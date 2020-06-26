import gql from 'graphql-tag';
import { scorer } from '../fragments';

export default gql`
  query getAvisUser($userId: String!) {
    getAvisUser(userId: $userId) {
      id
      score
      comment
      createdAt
      scorer {
        ...scorer
      }
    }
  }
  ${scorer}
`;
