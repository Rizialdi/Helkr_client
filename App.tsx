import { ApolloProvider } from '@apollo/react-hooks';
import { StoreProvider } from 'easy-peasy';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { SFC, useState, useEffect, useCallback } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { InitialState } from '@react-navigation/native';
import Constants from 'expo-constants';

const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY-${Constants.manifest.sdkVersion}`;

import store from './models';
import Navigation from './navigation';

import client from './ApolloClient';
import { AsyncStorage } from 'react-native';

const icons = [
  require('./assets/icons/house.svg'),
  require('./assets/icons/student.svg'),
  require('./assets/icons/phone1.svg'),
  require('./assets/icons/phone1-1.svg'),
  require('./assets/icons/phone1-2.svg'),
  require('./assets/icons/reglages.svg'),
  require('./assets/icons/marksymbol.svg'),
  require('./assets/images/defaultUserImage.png')
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
    serifSemiBold: require('./assets/fonts/SourceSerifPro-SemiBold.ttf'),
    HelveticaNeue: require('./assets/fonts/Raleway-Regular.ttf')
  });

  const cacheIcons = icons.map(icon => {
    return Asset.fromModule(icon).downloadAsync();
  });

  return Promise.all(cacheIcons);
};

const App: SFC<Props> = ({ skipLoadingScreen }) => {
  const [isNavigationReady, setIsNavigationReady] = useState(!__DEV__);
  const [initialState, setInitialState] = useState<InitialState | undefined>();
  const [isLoadingComplete, setIsLoadingComplete] = useState<boolean>(false);

  useEffect(() => {
    const restoreState = async () => {
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

  if (!isLoadingComplete && !skipLoadingScreen && !isNavigationReady) {
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
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <StoreProvider store={store}>
            <SafeAreaProvider>
              <Navigation {...{ initialState, onStateChange }} />
            </SafeAreaProvider>
          </StoreProvider>
        </SafeAreaProvider>
      </ApolloProvider>
    </SafeAreaProvider>
  );
};

export default App;
