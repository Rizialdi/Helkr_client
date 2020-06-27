import gql from 'graphql-tag';
import message from './message.fragment';
import user from './user.fragment';

export default gql`
  fragment chat on channel {
    id
    messages {
      ...message
    }
    createdAt
    users {
      ...user
    }
  }
  ${message}
  ${user}
`;
