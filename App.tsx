import React from 'react';
import { StyleSheet } from 'react-native';

import { AppLoading } from "expo";
import * as Font from 'expo-font';
import { Asset } from "expo-asset";

import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

import Navigation from "./navigation";
import {Block} from './components'

// TODO change the ip address before production
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://10.53.18.97:4000'
});

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
