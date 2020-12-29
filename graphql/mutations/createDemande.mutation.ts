import gql from 'graphql-tag';

export default gql`
  mutation createDemande($message: String!, $recipient: String!) {
    createDemande(message: $message, recipient: $recipient)
  }
`;
