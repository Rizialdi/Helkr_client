import gql from 'graphql-tag';

export default gql`
  mutation addOffering(
    $type: String!
    $category: String!
    $description: String!
    $details: String!
  ) {
    addOffering(
      type: $type
      category: $category
      description: $description
      details: $details
    )
  }
`;
