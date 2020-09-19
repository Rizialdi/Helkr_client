import gql from 'graphql-tag';

export default gql`
  mutation registerUser($nom: String!, $prenom: String!, $numero: String!) {
    registerUser(nom: $nom, prenom: $prenom, numero: $numero) {
      token
      user {
        id
        prenom
      }
    }
  }
`;
