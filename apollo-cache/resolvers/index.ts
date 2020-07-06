import gql from 'graphql-tag';
import { ApolloCache } from 'apollo-cache';
import { Resolvers } from 'apollo-client';
import {
  LastMessageReadIdAndChannel,
  MutationUpdateLastMessageIdorAddChatArgs
} from '../../graphql/helpkr-types';

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
    lastMessageReadId: async (parent, _, { cache }): Promise<string> => {
      try {
        const queryResult = await cache.readQuery<{
          lastMessageReadIds: [LastMessageReadIdAndChannel];
        }>({
          query: GET_LAST_MESSAGE_IDS
        });

        const channel = queryResult?.lastMessageReadIds.filter(
          item => item?.channelId === parent.id
        );

        if (channel && channel[0]) return channel[0].lastMessageReadId;

        return '';
      } catch (error) {
        throw new Error(`${error}`);
      }
    }
  },
  Mutation: {
    updateLastMessageIdorAddChat: async (
      _,
      {
        channelId,
        lastMessageReadId
      }: MutationUpdateLastMessageIdorAddChatArgs,
      { cache }
    ): Promise<boolean | string> => {
      try {
        const queryResult = await cache.readQuery<{
          lastMessageReadIds: [LastMessageReadIdAndChannel];
        }>({
          query: GET_LAST_MESSAGE_IDS
        });

        if (queryResult?.lastMessageReadIds) {
          const data = queryResult?.lastMessageReadIds.map(item => {
            if (item?.channelId === channelId) {
              item.lastMessageReadId = lastMessageReadId;

              const newItem = {
                __typename: 'LastMessageReadIdAndChannel',
                channelId,
                lastMessageReadId
              };
              return newItem;
            }
            return item;
          });

          cache.writeQuery({ query: GET_LAST_MESSAGE_IDS, data });

          cache.writeData({
            data: {
              lastMessageReadIds: [...data]
            }
          });
          return JSON.stringify(cache);
        }

        return false;
      } catch (error) {
        throw new Error(`${error}`);
      }
    }
  }
};

export default resolvers;
