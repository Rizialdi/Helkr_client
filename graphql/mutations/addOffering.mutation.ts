import gql from 'graphql-tag';

export default gql`
  mutation addOffering(
    $type: String!
    $category: String!
    $description: String!
    $details: String!
    $referenceId: String!
  ) {
    addOffering(
      type: $type
      details: $details
      category: $category
      description: $description
      referenceId: $referenceId
    )
  }
`;
