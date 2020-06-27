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

import { WEB_SERVER_ADDRESS, WEB_SERVER_PORT } from './config';
import store from './models';
import Navigation from './navigation';
import { PersistentStorage, PersistedData } from 'apollo-cache-persist/types';
import introspectionQueryResultData from './graphql/helpkr-types';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: { __schema: { types: [] } }
});
// TODO change the ip address before production
const cache = new InMemoryCache({ fragmentMatcher });

persistCache({
  cache,
  storage: AsyncStorage as PersistentStorage<
    PersistedData<NormalizedCacheObject>
  >
});

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

// using the ability to split links, you can send data to each link
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
  cache,
  link
});

// import all icons
const icons = [
  require('./assets/icons/house.svg'),
  require('./assets/icons/student.svg'),
  require('./assets/icons/phone1.svg'),
  require('./assets/icons/phone1-1.svg'),
  require('./assets/icons/phone1-2.svg'),
  require('./assets/icons/reglages.svg'),
  require('./assets/icons/marksymbol.svg'),
  require('./assets/images/default-user-image.png')
];

interface Props {
  skipLoadingScreen?: boolean;
}

const handleResourcesAsync = async () => {
  await Font.loadAsync({
    josefinBold: require('./assets/fonts/JosefinSans-Bold.ttf'),
    josefinLight: require('./assets/fonts/JosefinSans-Light.ttf'),
    josefinRegular: require('./assets/fonts/JosefinSans-Regular.ttf'),
    josefinSemiBold: require('./assets/fonts/JosefinSans-SemiBold.ttf'),
    rockSalt: require('./assets/fonts/RockSalt-Regular.ttf'),
    serifRegular: require('./assets/fonts/SourceSerifPro-Regular.ttf'),
    serifBold: require('./assets/fonts/SourceSerifPro-Bold.ttf'),
    serifSemiBold: require('./assets/fonts/SourceSerifPro-SemiBold.ttf')
  });

  const cacheIcons = icons.map(icon => {
    return Asset.fromModule(icon).downloadAsync();
  });

  return Promise.all(cacheIcons);
};

const App: SFC<Props> = ({ skipLoadingScreen }) => {
  const [isLoadingComplete, setIsLoadingComplete] = useState<boolean>(false);
  if (!isLoadingComplete && !skipLoadingScreen) {
    return (
      <AppLoading
        // @ts-ignore
        startAsync={handleResourcesAsync}
        onError={error => {
          throw error;
        }}
        onFinish={() => setIsLoadingComplete(true)}
      />
    );
  }

  return (
    <ApolloProvider client={client}>
      <StoreProvider store={store}>
        <Navigation />
      </StoreProvider>
    </ApolloProvider>
  );
};

export default App;
