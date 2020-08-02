import gql from 'graphql-tag';
import user from './user.fragment';
export default gql`
  fragment avis on avis {
    id
    comment
    createdAt
    score
    scorer {
      ...user
    }
  }
  ${user}
`;
