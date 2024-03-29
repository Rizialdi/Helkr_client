import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useMemo, useState } from 'react';
import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { CommonActions } from '@react-navigation/native';

import { mocks, theme } from '../../constants';
import { useNotificationsTokenUpdateMutation } from '../../graphql';
import { useStoreState } from '../../models';
import {
  BottomStackParamList,
  StackNavigationInterface
} from '../../navigation/Routes';
import { Block, Layout, ModalItemInfos } from '../sharedComponents';
import { Categories, UserWelcome } from './components';
import { CategoriesInterface } from './components/Interfaces';
import {
  firstAppOpening,
  handleOpenURL,
  navigationOnNotification,
  Payload,
  registerForPushNotificationsAsync
} from './utils';

const Accueil = (
  navigation: StackNavigationInterface<BottomStackParamList, 'Accueil'>
): JSX.Element => {
  const [tokenUpdate] = useNotificationsTokenUpdateMutation();

  const [categories, setCategories] = useState<CategoriesInterface | null>(
    null
  );
  const [inputText, setInputText] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [firstOpening, setFirstOpening] = useState<boolean>(false);
  const { user } = useStoreState(state => state.User);
  const [placeholder, setPlaceholder] = useState<string>('Babysitting');

  useEffect(() => {
    const steps = [
      'Répassage',
      'Peinture',
      'Coiffure',
      'Photographie',
      'Démenagement',
      'Livraison'
    ];

    const filteredStep = steps.filter(item => item !== placeholder);
    const rand = Math.round(Math.abs(Math.random()) * (steps.length - 2));

    const timer = setTimeout(() => setPlaceholder(filteredStep[rand]), 3000);
    return (): void => clearTimeout(timer);
  }, [placeholder]);

  const handleInput = (): void => setInputText('');

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useMemo(() => {
    if (isMounted) {
      setCategories(mocks.accueil as CategoriesInterface);
      user && user.prenom && setUsername(user.prenom);
    }
  }, [user, isMounted]);

  useEffect(() => {
    (async (): Promise<void> => {
      const firstOpeninG = await firstAppOpening();
      firstOpeninG &&
        registerForPushNotificationsAsync().then(async token => {
          token && tokenUpdate({ variables: { token } });
          await AsyncStorage.setItem('tokenForNotifications', token);
        });
      if (firstOpeninG) {
        setFirstOpening(firstOpeninG);

        navigation.navigation.dispatch(state => {
          // Remove the home route from the stack
          const routes = state.routes.filter(
            r =>
              ![
                'RegisterPhoneNumber',
                'RegisterPhoneNumberVerification',
                'RegisterUsername',
                'LoadedUserData'
              ].includes(r.name)
          );

          return CommonActions.reset({
            ...state,
            routes,
            index: 2
          });
        });
      }
    })();

    const subscription = Notifications.addNotificationResponseReceivedListener(
      response => {
        const payload: Payload = response.notification.request.content.data
          .body as Payload;
        navigationOnNotification(navigation, payload);
      }
    );

    // To open deep links in the app
    // Deeplinks such as profile opening

    Linking.getInitialURL()
      .then(str => {
        if (str) {
          handleOpenURL(navigation, str);
        }
      })
      .catch(err => {
        console.warn('An error occurred', err);
      });

    Linking.addEventListener('url', obj => handleOpenURL(navigation, obj));

    return (): void => {
      subscription.remove();
      Linking.removeEventListener('url', obj => handleOpenURL(navigation, obj));
    };
  }, [navigation, tokenUpdate]);

  return (
    <Layout>
      <>
        {!isMounted || !categories ? (
          <View
            style={{
              zIndex: 99,
              position: 'absolute',
              top: theme.sizes.screenHeight / 2,
              marginHorizontal: theme.sizes.screenWidth / 2
            }}>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              paddingVertical: theme.sizes.base * 2
            }}>
            {username && <UserWelcome {...{ username }} />}
            <View style={styles.container}>
              <Block style={styles.tabBar}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center'
                  }}>
                  <TextInput
                    style={{ flex: 1, marginLeft: 10, ...styles.input }}
                    defaultValue={inputText}
                    placeholder={'Essayer '.concat('"', placeholder, '"')}
                    onChangeText={(text): void => setInputText(text)}
                  />
                  <TouchableOpacity
                    style={styles.touchable}
                    onPress={(): void => handleInput()}>
                    {inputText ? (
                      <Icon name="close" size={16} color="black" />
                    ) : (
                      <Icon name="search1" size={16} color="black" />
                    )}
                  </TouchableOpacity>
                </View>
              </Block>
              {firstOpening && (
                <ModalItemInfos
                  information={'Bienvenue'}
                  description={
                    'Nous sommes heureux de vous compter dans nos rangs. Helkr existe pour vous aider afin que vous puissiez en faire de même. Merci.'
                  }
                  timer={1}
                />
              )}
            </View>
            {categories && (
              //@ts-ignore
              <Categories {...{ categories, inputText, navigation }} />
            )}
          </ScrollView>
        )}
      </>
    </Layout>
  );
};

export default Accueil;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 0,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    marginVertical: 10,
    height: 40
  },
  tabBar: {
    flex: 0.9,
    alignItems: 'center',
    backgroundColor: 'rgba(238, 240, 246, 0.5)',
    borderRadius: 7,
    marginHorizontal: 5
  },
  input: {
    backgroundColor: 'rgba(238, 240, 246, 0)'
  },
  touchable: {
    flex: 0.1,
    padding: 7,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginRight: 5
  },
  loopTouchable: {
    flex: 0.1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(238, 240, 246, 0.5)',
    borderRadius: 7,
    marginLeft: 5
  }
});
