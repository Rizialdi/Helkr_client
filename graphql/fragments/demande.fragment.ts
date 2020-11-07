import gql from 'graphql-tag';

export default gql`
  fragment demande on demande {
    id
    sentById
    message
    createdAt
  }
`;
