import gql from 'graphql-tag';
import { ApolloCache } from 'apollo-cache';
import { Resolvers } from 'apollo-client';
import { LastMessageReadIdAndChannel } from '../../graphql/helpkr-types';

export const GET_LAST_MESSAGE_IDS = gql`
  query GetLastMessageIds {
    lastMessageReadIds @client {
      channelId
      lastMessageReadId
    }
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
          item => item.channelId === parent.id
        );

        if (channel && channel[0]) return channel[0].lastMessageReadId;

        return '';
      } catch (error) {
        throw new Error(`${error}`);
      }
    }
  },
  Mutation: {
    addOrRemoveFromCart: (_, { id }: { id: string }, { cache }): string[] => {
      return [];
    }
  }
};

export default resolvers;
