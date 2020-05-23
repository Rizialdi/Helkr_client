import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { SFC, useState, useMemo } from 'react';
import { AsyncStorage } from 'react-native';

import {
  UserContext,
  userContextInterface,
  providerInterface
} from './userContext';

import { WEB_SERVER_ADDRESS, WEB_SERVER_PORT } from './config';
import Navigation from './navigation';

// TODO change the ip address before production
const cache = new InMemoryCache();

persistCache({
  cache,
  storage: AsyncStorage
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

// TODO change token
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
  authLink.concat(wsLink),
  authLink.concat(httpLink)
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

  const cacheIcons = icons.map((icon) => {
    return Asset.fromModule(icon).downloadAsync();
  });

  return Promise.all(cacheIcons);
};

const App: SFC<Props> = ({ skipLoadingScreen }) => {
  const [user, setUser] = useState<userContextInterface>(null);
  const [isLoadingComplete, setIsLoadingComplete] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      user,
      setUser
    }),
    [user, setUser]
  );

  if (!isLoadingComplete && !skipLoadingScreen) {
    return (
      <AppLoading
        // @ts-ignore
        startAsync={handleResourcesAsync}
        onError={(error) => {
          throw error;
        }}
        onFinish={() => setIsLoadingComplete(true)}
      />
    );
  }

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={value as providerInterface}>
        <Navigation />
      </UserContext.Provider>
    </ApolloProvider>
  );
};

export default App;
