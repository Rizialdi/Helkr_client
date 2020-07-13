import { ApolloProvider } from '@apollo/react-hooks';
import {
  InMemoryCache,
  NormalizedCacheObject,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { getMainDefinition } from 'apollo-utilities';
import { StoreProvider } from 'easy-peasy';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { SFC, useState } from 'react';
import { AsyncStorage } from 'react-native';
import { PersistentStorage, PersistedData } from 'apollo-cache-persist/types';

import { WEB_SERVER_ADDRESS, WEB_SERVER_PORT } from './config';
import store from './models';
import Navigation from './navigation';
import { typeDefs, resolvers } from './apollo-cache';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: { __schema: { types: [] } }
});
// TODO change the ip address before production
export const cache = new InMemoryCache({ fragmentMatcher });

cache.writeData({
  data: {
    lastMessageReadIds: []
  }
});

// const persistor = new CachePersistor({
//   cache,
//   storage: AsyncStorage as PersistentStorage<
//     PersistedData<NormalizedCacheObject>
//   >
// });

persistCache({
  cache,
  storage: AsyncStorage as PersistentStorage<
    PersistedData<NormalizedCacheObject>
  >
});

//Instead of using persistCache, you can instantiate a CachePersistor,
// which will give you fine - grained control of persistence.
// persistor.restore(); // Immediately restore the cache. Returns a Promise.
// // persistor.persist(); // Immediately persist the cache. Returns a Promise.
// persistor.purge(); // Immediately purge the stored cache. Returns a Promise.
// persistor.persist();

// Create an http link:

const httpLink = createHttpLink({
  //TODO https
  uri: `http://${WEB_SERVER_ADDRESS}:${WEB_SERVER_PORT}`,
  fetchOptions: {
    reconnect: true
  }
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  //TODO: wss
  uri: `ws://${WEB_SERVER_ADDRESS}:${WEB_SERVER_PORT}`,
  options: {
    reconnect: true
  }
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem('token');

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

// using the ability AllChatsAndMessagesto split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  errorLink.concat(authLink).concat(wsLink),
  errorLink.concat(authLink).concat(httpLink)
);

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolvers
});

export default client;
