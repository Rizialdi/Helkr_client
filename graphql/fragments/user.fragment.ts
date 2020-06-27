import gql from 'graphql-tag';

export default gql`
  fragment user on utilisateur {
    id
    nom
    prenom
    avatar
  }
`;
