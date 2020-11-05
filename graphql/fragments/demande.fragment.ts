import gql from 'graphql-tag';

export default gql`
  fragment demande on demande {
    sentById
    message
    createdAt
  }
`;
