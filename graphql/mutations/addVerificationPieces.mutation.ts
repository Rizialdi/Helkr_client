import gql from 'graphql-tag';

export default gql`
  mutation addVerificationpieces(
    $id: String
    $listofpieces: String!
    $referenceId: String!
  ) {
    addVerificationpieces(
      id: $id
      listofpieces: $listofpieces
      referenceId: $referenceId
    )
  }
`;
