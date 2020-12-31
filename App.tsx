import { StoreProvider } from 'easy-peasy';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import React, { SFC, useCallback, useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

import * as Sentry from 'sentry-expo';

import { ApolloProvider } from '@apollo/react-hooks';
import { InitialState } from '@react-navigation/native';

import client from './ApolloClient';
import store from './models';
import Navigation from './navigation';

const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY-${Constants.manifest.sdkVersion}`;

const icons = [require('./assets/images/defaultUserImage.png')];

interface Props {
  skipLoadingScreen?: boolean;
}

const handleResourcesAsync = async (): Promise<void[]> => {
  (async (): Promise<void> => {
    await Font.loadAsync({
      josefinBold: require('./assets/fonts/JosefinSans-Bold.ttf'),
      josefinLight: require('./assets/fonts/JosefinSans-Light.ttf'),
      josefinRegular: require('./assets/fonts/JosefinSans-Regular.ttf'),
      josefinSemiBold: require('./assets/fonts/JosefinSans-SemiBold.ttf'),
      HelveticaNeue: require('./assets/fonts/OpenSans-Regular.ttf')
    });
  })();

  const cacheIcons = icons.map(icon => {
    return Asset.fromModule(icon).downloadAsync();
  });

  return Promise.all(cacheIcons);
};

// TODO: Set to false Sentry properties for prod
Sentry.init({
  dsn:
    'https://e8b1308767024fedb1e5c4d945326c8c@o498122.ingest.sentry.io/5576044',
  enableInExpoDevelopment: true,
  debug: true // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
});

const App: SFC<Props> = ({ skipLoadingScreen }) => {
  const [isNavigationReady, setIsNavigationReady] = useState(!__DEV__);
  const [initialState, setInitialState] = useState<InitialState | undefined>();
  const [isLoadingComplete, setIsLoadingComplete] = useState<boolean>(false);

  useEffect(() => {
    const restoreState = async (): Promise<void> => {
      try {
        const savedStateString = await AsyncStorage.getItem(
          NAVIGATION_STATE_KEY
        );
        const state = savedStateString
          ? JSON.parse(savedStateString)
          : undefined;
        setInitialState(state);
      } finally {
        setIsNavigationReady(true);
      }
    };

    if (!isNavigationReady) {
      restoreState();
    }
  }, [isNavigationReady]);

  const onStateChange = useCallback(
    state => AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state)),
    []
  );

  if ((!isLoadingComplete && !skipLoadingScreen) || !isNavigationReady) {
    return (
      <SafeAreaProvider
        initialSafeAreaInsets={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <AppLoading
          // @ts-ignore
          startAsync={handleResourcesAsync}
          onError={error => {
            throw error;
          }}
          onFinish={() => setIsLoadingComplete(true)}
        />
      </SafeAreaProvider>
    );
  }

  return (
    <ApolloProvider client={client}>
      <StoreProvider store={store}>
        <SafeAreaProvider
          initialSafeAreaInsets={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Navigation {...{ initialState, onStateChange }} />
        </SafeAreaProvider>
      </StoreProvider>
    </ApolloProvider>
  );
};

export default App;
