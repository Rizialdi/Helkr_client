import gql from 'graphql-tag';
import user from './user.fragment';

export default gql`
  fragment scorer on utilisateur {
    ...user
  }
  ${user}
`;
