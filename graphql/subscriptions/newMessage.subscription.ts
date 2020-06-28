import gql from 'graphql-tag';
import { message } from '../fragments';

export default gql`
  subscription NewMessage($channelIds: [String!]!) {
    newMessage(channelIds: $channelIds) {
      ...message
      channelId
    }
  }
  ${message}
`;
