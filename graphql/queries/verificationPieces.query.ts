import gql from 'graphql-tag';

export default gql`
  query getVerificationPieces($id: String) {
    getVerificationPieces(id: $id) {
      listofpieces
    }
  }
`;
