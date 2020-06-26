import gql from 'graphql-tag';

export default gql`
  mutation candidateToOffering($id: String!) {
    candidateToOffering(id: $id) {
      success
    }
  }
`;
