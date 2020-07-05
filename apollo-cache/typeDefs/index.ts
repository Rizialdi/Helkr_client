import gql from 'graphql-tag';

const typeDefs = gql`
  extend type Query {
    # TODO Should we adopt apollo cache for login ?
    lastMessageReadIds: [LastMessageReadIdAndChannel]
  }

  type LastMessageReadIdAndChannel {
    channelId: String!
    lastMessageReadId: String!
  }

  extend type channel {
    lastMessageReadId: String!
  }

  extend type Mutation {
    updateLastMessageIdorAddChat(
      channelId: String!
      lastMessageReadId: String!
    ): Boolean
  }
`;

export default typeDefs;
