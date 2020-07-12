import gql from 'graphql-tag';

export default gql`
  mutation deleteOffering($id: String!) {
    deleteOffering(id: $id)
  }
`;
