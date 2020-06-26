import gql from 'graphql-tag';

export default gql`
  subscription updateAppliedTo($userId: String!) {
    updateAppliedTo(userId: $userId) {
      id
      status
    }
  }
`;
