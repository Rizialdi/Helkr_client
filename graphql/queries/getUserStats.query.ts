import gql from 'graphql-tag';

export default gql`
  query getUserStats($id: String!) {
    getUserStats(id: $id) {
      done
      proposed
      average
    }
  }
`;
