import { ApolloProvider } from '@apollo/react-hooks';
import { StoreProvider } from 'easy-peasy';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { SFC, useState } from 'react';
import store from './models';
import Navigation from './navigation';

import client from './ApolloClient';

// import all icons
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
