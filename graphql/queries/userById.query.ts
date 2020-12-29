import gql from 'graphql-tag';

export default gql`
  query userById($id: String!) {
    userById(id: $id) {
      nom
      tags
      prenom
      avatar
      numero
      address
      verified
      description
      professional
    }
  }
`;
