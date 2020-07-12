import gql from 'graphql-tag';

export default gql`
  fragment offering on offering {
    id
    type
    category
    description
    createdAt
    updatedAt
  }
`;
