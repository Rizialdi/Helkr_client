import gql from 'graphql-tag';

export default gql`
  mutation notificationsTokenUpdate($token: String!) {
    notificationsTokenUpdate(token: $token)
  }
`;
