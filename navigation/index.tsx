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
import DetailCategory from '../screens/DetailCategory';
import DetailItem from '../screens/DetailCategory/components/DetailItem';
import JoinOrFindAJobber from '../screens/DetailCategory/components/JoinOrFindAJobber';
import { Discussions } from '../screens/Discussions';
import Manage from '../screens/Manage';
import Postuler from '../screens/Postuler';
import Profile from '../screens/Profile';
import Reglages from '../screens/Reglages';
import OnBoarding from '../screens/OnBoarding';
import {
  MyOfferingsModal,
  MyCandidateToOffering,
  DetailsOnOfferingProposition
} from '../screens/Manage/components';

import {
  MakeAnOffer,
  OfferingsListModal,
  MyAppliedOfferingModal
} from '../screens/Postuler/components';

import {
  LoadedUserData,
  RegisterPhoneNumber,
  RegisterUsername,
  RegisterPhoneNumberVerification
} from '../screens/SignIn';
import { useStoreActions, useStoreState } from '../models';
import { theme } from '../constants';
import {
  MainStackParamList,
  BottomStackParamList,
  DetailStackParamsList
} from './Routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AsyncStorage } from 'react-native';
import { BienvenueFirst } from '../screens/BienvenueFirst';
import { DetailOfferingParamsList } from './Routes';

const MainStack = createStackNavigator<MainStackParamList>();
const MaterialBottomTabs = createMaterialBottomTabNavigator<
  BottomStackParamList
>();

const DetailModalPresentation = createStackNavigator<DetailStackParamsList>();

const DetailCategoryScreens = () => {
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
          headerTitleStyle: { fontSize: 18 },
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
      <DetailModalPresentation.Screen
        name="JoinOrFindAJobber"
        component={JoinOrFindAJobber}
        options={({ route }) => ({
          headerShown: true,
          headerTitle: route.params.categoryItem,
          headerTitleStyle: { fontSize: 18 },
          headerTintColor: 'black',
          animationEnabled: true
        })}
      />
    </DetailModalPresentation.Navigator>
  );
};

const DetailOfferingPresentation = createStackNavigator<
  DetailOfferingParamsList
>();

const DetailOfferingScreens = () => {
  return (
    <DetailOfferingPresentation.Navigator
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
      <DetailOfferingPresentation.Screen
        name="MyOfferingsModal"
        component={MyOfferingsModal}
        options={() => ({
          headerShown: true,
          title: 'Détails',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 20 },
          headerTintColor: 'black'
        })}
      />
      <DetailOfferingPresentation.Screen
        name="MyCandidateToOffering"
        component={MyCandidateToOffering}
        options={() => ({
          headerShown: true,
          title: 'Détails',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 20 },
          headerTintColor: 'black'
        })}
      />
      <DetailOfferingPresentation.Screen
        name="OfferingsListModal"
        component={OfferingsListModal}
        options={() => ({
          headerShown: true,
          title: 'Détails',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 20 },
          headerTintColor: 'black'
        })}
      />
      <DetailOfferingPresentation.Screen
        name="MakeAnOffer"
        component={MakeAnOffer}
        options={() => ({
          headerShown: true,
          title: 'Faire une proposition',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 20 },
          headerTintColor: 'black'
        })}
      />
      <DetailOfferingPresentation.Screen
        name="MyAppliedOfferingModal"
        component={MyAppliedOfferingModal}
        options={() => ({
          headerShown: true,
          title: 'Détails',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 20 },
          headerTintColor: 'black'
        })}
      />
      <DetailOfferingPresentation.Screen
        name="DetailsOnOfferingProposition"
        component={DetailsOnOfferingProposition}
        options={() => ({
          headerShown: true,
          title: 'Proposition',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 20 },
          headerTintColor: 'black'
        })}
      />
    </DetailOfferingPresentation.Navigator>
  );
};

//----------------------------------

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
            <AntDesign name="switcher" size={22} color="black" />
          )
        }}
      />
      <MaterialBottomTabs.Screen
        name="Postuler"
        component={Postuler}
        options={{
          tabBarLabel: 'Naviguer',
          tabBarIcon: () => (
            <AntDesign name="appstore-o" size={22} color="black" />
          )
        }}
      />
      <MaterialBottomTabs.Screen
        name="Accueil"
        component={Accueil}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: () => <AntDesign name="home" size={22} color="black" />
        }}
      />
      <MaterialBottomTabs.Screen
        name="Discussions"
        component={Discussions}
        options={{
          tabBarLabel: 'Discussions',
          tabBarIcon: () => (
            <AntDesign name="message1" size={22} color="black" />
          )
        }}
      />
      <MaterialBottomTabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: () => <AntDesign name="user" size={22} color="black" />
        }}
      />
    </MaterialBottomTabs.Navigator>
  );
};

const MyMainStack: React.SFC<{ token: string | null }> = ({ token }) => {
  return (
    <SafeAreaProvider>
      <MainStack.Navigator
        initialRouteName={token ? 'PrincipalView' : 'OnBoarding'}
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
              component={DetailCategoryScreens}
              options={() => ({
                headerShown: false
              })}
            />
            <MainStack.Screen
              name="DetailOffering"
              component={DetailOfferingScreens}
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
              name="OnBoarding"
              component={OnBoarding}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="RegisterPhoneNumber"
              component={RegisterPhoneNumber}
              options={{
                headerShown: false
              }}
            />
            <MainStack.Screen
              name="RegisterPhoneNumberVerification"
              component={RegisterPhoneNumberVerification}
              options={{
                headerShown: false
              }}
            />
            <MainStack.Screen
              name="RegisterUsername"
              component={RegisterUsername}
              options={{
                headerShown: false
              }}
            />
            <MainStack.Screen
              name="LoadedUserData"
              component={LoadedUserData}
              options={{
                headerShown: false
              }}
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
              name="DetailOffering"
              component={DetailOfferingScreens}
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
  //   // await AsyncStorage.multiSet([
  //   //   ['id', 'ckd2zam8m0000u0p96s31gk9y'],
  //   //   [
  //   //     'token',
  //   //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJja2QyemFtOG0wMDAwdTBwOTZzMzFnazl5IiwiaWF0IjoxNTk2OTExOTYyfQ.ekN4LPpY14cGVXfDA_2nZ9sWZBkUeXY93L8kN3uQ0tw'
  //   //   ],
  //   //   ['prenom', 'Hooom']
  //   // ]);
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
    <NavigationContainer
      {...{
        initialState,
        onStateChange
      }}>
      <MyMainStack token={user && user.token ? user.token : null} />
    </NavigationContainer>
  );
};
