import gql from 'graphql-tag';
import { chat } from '../fragments';

export default gql`
  query allChatsAndMessages {
    allChatsAndMessages {
      ...chat
    }
  }
  ${chat}
`;
