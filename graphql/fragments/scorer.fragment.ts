import gql from 'graphql-tag';

export default gql`
  fragment scorer on utilisateur {
    id
    nom
    prenom
    avatar
  }
`;
