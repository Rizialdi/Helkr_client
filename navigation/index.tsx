import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  NavigationContainer,
  NavigationState,
  InitialState
} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack';

import Accueil from '../screens/Accueil';
import Avis from '../screens/Avis';
import BienvenueFirst from '../screens/BienvenueFirst';
import DetailCategory from '../screens/DetailCategory';
import DetailItem from '../screens/DetailCategory/components/DetailItem';
import { Discussions } from '../screens/Discussions';
import Enregistrement from '../screens/Enregistrement';
import Identification from '../screens/Identification';
import Manage from '../screens/Manage';
import Postuler from '../screens/Postuler';
import Profile from '../screens/Profile';
import Reglages from '../screens/Reglages';
import Screen from '../screens/Screen';
import Verification from '../screens/Verification';
import { useStoreActions, useStoreState } from '../models';
import { theme } from '../constants';
import {
  MainStackParamList,
  BottomStackParamList,
  DetailStackParamsList
} from './Routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AsyncStorage } from 'react-native';

const MainStack = createStackNavigator<MainStackParamList>();
const MaterialBottomTabs = createMaterialBottomTabNavigator<
  BottomStackParamList
>();

const DetailModalPresentation = createStackNavigator<DetailStackParamsList>();

const Detail = () => {
  return (
    <DetailModalPresentation.Navigator
      mode="modal"
      screenOptions={({ route, navigation }) => ({
        ...TransitionPresets.ModalPresentationIOS,
        cardOverlayEnabled: true,
        gestureEnabled: true,
        headerStatusBarHeight:
          navigation.dangerouslyGetState().routes.indexOf(route) > 0
            ? 0
            : undefined
      })}>
      <DetailModalPresentation.Screen
        name="DetailCategory"
        component={DetailCategory}
        options={({ route }) => ({
          headerShown: true,
          title: route.params.category.name,
          headerTitleAlign: 'left',
          headerTitleStyle: { fontSize: 20 },
          headerTintColor: 'black'
        })}
      />
      <DetailModalPresentation.Screen
        name="DetailItem"
        component={DetailItem}
        options={() => ({
          headerShown: false
        })}
      />
    </DetailModalPresentation.Navigator>
  );
};

const createBottomTabs = () => {
  return (
    <MaterialBottomTabs.Navigator
      initialRouteName="Accueil"
      activeColor={theme.colors.primary}
      sceneAnimationEnabled={true}
      backBehavior={'initialRoute'}
      shifting={true}
      barStyle={{ backgroundColor: theme.colors.white, height: 50 }}>
      <MaterialBottomTabs.Screen
        name="Gerer"
        component={Manage}
        options={{
          tabBarLabel: 'Gerer',
          tabBarIcon: () => (
            <AntDesign name="pluscircleo" size={24} color="black" />
          )
        }}
      />
      <MaterialBottomTabs.Screen
        name="Postuler"
        component={Postuler}
        options={{
          tabBarLabel: 'Postuler',
          tabBarIcon: () => <AntDesign name="tagso" size={24} color="black" />
        }}
      />
      <MaterialBottomTabs.Screen
        name="Accueil"
        component={Accueil}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: () => <AntDesign name="home" size={24} color="black" />
        }}
      />
      <MaterialBottomTabs.Screen
        name="Discussions"
        component={Discussions}
        options={{
          tabBarLabel: 'Discussions',
          tabBarIcon: () => (
            <AntDesign name="message1" size={24} color="black" />
          )
        }}
      />
      <MaterialBottomTabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: () => <AntDesign name="user" size={24} color="black" />
        }}
      />
    </MaterialBottomTabs.Navigator>
  );
};

const MyMainStack: React.SFC<{ token: string | null }> = ({ token }) => {
  return (
    <SafeAreaProvider>
      <MainStack.Navigator
        initialRouteName="Screen"
        headerMode="screen"
        screenOptions={{
          headerTintColor: 'black',
          headerTitleStyle: {
            color: 'black',
            alignSelf: 'center',
            fontSize: 20
          }
        }}>
        {token ? (
          <>
            <MainStack.Screen
              name="PrincipalView"
              children={createBottomTabs}
              options={{
                headerShown: false,
                title: ' '
              }}
            />
            <MainStack.Screen
              name="DetailCategory"
              component={Detail}
              options={() => ({
                headerShown: false
              })}
            />
            <MainStack.Screen
              name="Reglages"
              component={Reglages}
              options={() => ({
                headerShown: false
              })}
            />
            <MainStack.Screen
              name="Avis"
              component={Avis}
              options={() => ({
                headerShown: false
              })}
            />
            <MainStack.Screen
              name="Profile"
              component={Profile}
              options={() => ({ headerShown: false, title: '' })}
            />
          </>
        ) : (
          <>
            <MainStack.Screen
              name="Screen"
              component={Screen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Enregistrement"
              component={Enregistrement}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Identification"
              component={Identification}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Verification"
              component={Verification}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="PrincipalView"
              children={createBottomTabs}
              options={{
                headerShown: false,
                title: ' '
              }}
            />
            <MainStack.Screen
              name="DetailCategory"
              component={Detail}
              options={() => ({
                headerShown: false
              })}
            />
            <MainStack.Screen
              name="Reglages"
              component={Reglages}
              options={() => ({ headerShown: true, title: '' })}
            />
            <MainStack.Screen
              name="Avis"
              component={Avis}
              options={() => ({
                headerShown: false
              })}
            />
            <MainStack.Screen
              name="Profile"
              component={Profile}
              options={() => ({ headerShown: true, title: '' })}
            />
          </>
        )}
      </MainStack.Navigator>
    </SafeAreaProvider>
  );
};

interface Props {
  initialState: InitialState | undefined;
  onStateChange: ((state: NavigationState | undefined) => void) | undefined;
}

export default ({ initialState, onStateChange }: Props) => {
  const user = useStoreState(state => state.User.user);
  const {
    User: { loadUser },
    Offering: { loadTags },
    ChatMessages: { loadLastMessageReadIds },
    JobAuthorization: { loadJobAuthorizations },
    SendVerifPiecesReferenceIds: { loadsendVerifPiecesReferenceIds }
  } = useStoreActions(actions => actions);

  const [isLoading, setIsLoading] = useState(true);

  // (async () => {
  //   await AsyncStorage.clear();
  //   await AsyncStorage.multiSet([
  //     ['id', 'ckb9svn8p00000ip99ubjoc01'],
  //     [
  //       'token',
  //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJja2I5c3ZuOHAwMDAwMGlwOTl1YmpvYzAxIiwiaWF0IjoxNTk2ODk1Nzk3fQ.YzFA6MYj46xF44NsdlUTKKUn8-kjlavLkwIA3ar64Uw'
  //     ],
  //     ['prenom', 'Melinda']
  //   ]);
  // })();

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        loadUser();
        loadTags();
        loadLastMessageReadIds();
        loadJobAuthorizations();
        loadsendVerifPiecesReferenceIds();
        setTimeout(() => setIsLoading(false), 1000);
      } else {
        setTimeout(() => setIsLoading(false), 2000);
      }
    })();
  }, []);

  if (isLoading) return <BienvenueFirst />;

  return (
    <NavigationContainer {...{ initialState, onStateChange }}>
      <MyMainStack token={user && user.token ? user.token : null} />
    </NavigationContainer>
  );
};
