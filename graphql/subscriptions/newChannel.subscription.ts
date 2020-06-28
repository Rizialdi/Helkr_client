import gql from 'graphql-tag';
import { chat } from '../fragments';

export default gql`
  subscription newChannel($userId: String!) {
    newChannel(userId: $userId) {
      ...chat
    }
  }
  ${chat}
`;
