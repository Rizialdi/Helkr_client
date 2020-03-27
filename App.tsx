import React from 'react';
import { StyleSheet } from 'react-native';

import { AppLoading } from "expo";
import * as Font from 'expo-font';
import { Asset } from "expo-asset";

import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient } from 'apollo-client';
import { persistCache } from 'apollo-cache-persist';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { AsyncStorage } from 'react-native';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

import Navigation from "./navigation";
import { Block } from './components'

import { IP_ADDRESS } from "./config"

// TODO change the ip address before production
const cache = new InMemoryCache();

persistCache({
  cache,
  storage: AsyncStorage
});

// Create an http link:
const httpLink = new HttpLink({
  uri: `http://${IP_ADDRESS}:4000`
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://${IP_ADDRESS}:4000`,
  options: {
    reconnect: true
  }
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
  wsLink,
  httpLink,
);

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link
});

// import all images
const images = [
  require('./assets/images/anais.jpg'),
  require('./assets/images/benoit.jpg'),
  require('./assets/images/roland.jpg'),
  require('./assets/images/thierry.jpg')
];

interface Props {
  skipLoadingScreen?: boolean;
}

export default class App extends React.Component<Props> {
  state = {
    isLoadingComplete: false
  };

  handleResourcesAsync = async () => {

    await Font.loadAsync({
      'josefinBold': require('./assets/fonts/JosefinSans-Bold.ttf'),
      'josefinLight': require('./assets/fonts/JosefinSans-Light.ttf'),
      'josefinRegular': require('./assets/fonts/JosefinSans-Regular.ttf'),
      'josefinSemiBold': require('./assets/fonts/JosefinSans-SemiBold.ttf'),
      'rockSalt': require('./assets/fonts/RockSalt-Regular.ttf'),
      'serifRegular': require('./assets/fonts/SourceSerifPro-Regular.ttf'),
      'serifBold': require('./assets/fonts/SourceSerifPro-Bold.ttf'),
      'serifSemiBold': require('./assets/fonts/SourceSerifPro-SemiBold.ttf'),
    });

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          // @ts-ignore
          startAsync={this.handleResourcesAsync}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    }

    return (
      <ApolloProvider client={client}>
        <Block>
          <Navigation />
        </Block>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});