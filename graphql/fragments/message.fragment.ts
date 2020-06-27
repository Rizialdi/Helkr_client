import gql from 'graphql-tag';

export default gql`
  fragment message on message {
    id
    text
    createdAt
    sentById
  }
`;
