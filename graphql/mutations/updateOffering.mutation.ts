import gql from 'graphql-tag';

export default gql`
  mutation updateOffering($id: String!, $description: String!) {
    updateOffering(id: $id, description: $description)
  }
`;
