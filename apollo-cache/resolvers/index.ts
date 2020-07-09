import gql from 'graphql-tag';
import { ApolloCache } from 'apollo-cache';
import { Resolvers } from 'apollo-client';

export const GET_LAST_MESSAGE_IDS = gql`
  query GetLastMessageIds {
    lastMessageReadIds @client {
      channelId
      lastMessageReadId
    }
  }
`;

export const UPDATE_UNREAD_COUNT = gql`
  mutation UpdateLastMessageIdorAddChat(
    $channelId: String!
    $lastMessageReadId: String!
  ) {
    updateLastMessageIdorAddChat(
      channelId: $channelId
      lastMessageReadId: $lastMessageReadId
    ) @client
  }
`;

type ResolverFn = (
  parent: any,
  args: any,
  { cache }: { cache: ApolloCache<any> }
) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}

interface AppResolvers extends Resolvers {
  channel: ResolverMap;
  Mutation: ResolverMap;
}

const resolvers: AppResolvers = {
  channel: {
    lastMessageReadId: async (parent, _, { cache }) => {}
  },
  Mutation: {
    updateLastMessageIdorAddChat: async (_, __, { cache }) => {}
  }
};

export default resolvers;
