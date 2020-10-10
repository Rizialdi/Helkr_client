import gql from 'graphql-tag';

export default gql`
  mutation candidateToOffering(
    $id: String!
    $message: String!
    $priceRange: String!
  ) {
    candidateToOffering(id: $id, message: $message, priceRange: $priceRange) {
      success
    }
  }
`;
