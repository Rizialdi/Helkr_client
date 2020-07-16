import gql from 'graphql-tag';

export default gql`
  query getSendVerificationPiecesReferenceIdsAndStatus($id: String!) {
    getSendVerificationPiecesReferenceIdsAndStatus(id: $id)
  }
`;
