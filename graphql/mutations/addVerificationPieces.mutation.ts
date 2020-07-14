import gql from 'graphql-tag';

export default gql`
  mutation addVerificationpieces($id: String, $listofpieces: String!) {
    addVerificationpieces(id: $id, listofpieces: $listofpieces)
  }
`;
