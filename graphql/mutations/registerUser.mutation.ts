import gql from 'graphql-tag';

export default gql`
  mutation registerUser(
    $nom: String!
    $prenom: String!
    $numero: String!
    $address: String!
  ) {
    registerUser(
      nom: $nom
      prenom: $prenom
      numero: $numero
      address: $address
    ) {
      token
      user {
        id
        prenom
      }
    }
  }
`;
