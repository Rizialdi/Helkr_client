import gql from 'graphql-tag';

export default gql`
  mutation createMessage(
    $channelId: String
    $recipient: String
    $text: String!
  ) {
    createMessage(channelId: $channelId, recipient: $recipient, text: $text)
  }
`;
