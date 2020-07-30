import Icon from 'react-native-vector-icons/AntDesign';
import React, { useEffect, useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Accueil from '../screens/Accueil';
import Avis from '../screens/Avis';
import BienvenueFirst from '../screens/BienvenueFirst';
import DetailCategory from '../screens/DetailCategory';
import { Discussion, Discussions } from '../screens/Discussions';
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
import { MainStackParamList, BottomStackParamList } from './Routes';

const MainStack = createStackNavigator<MainStackParamList>();
const MaterialBottomTabs = createMaterialBottomTabNavigator<
  BottomStackParamList
>();

const createBottomTabs = () => {
  return (
    <MaterialBottomTabs.Navigator
      initialRouteName="Postuler"
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
          tabBarIcon: () => <Icon name="pluscircleo" size={24} color="black" />
        }}
      />
      <MaterialBottomTabs.Screen
        name="Postuler"
        component={Postuler}
        options={{
          tabBarLabel: 'Postuler',
          tabBarIcon: () => <Icon name="tagso" size={24} color="black" />
        }}
      />
      <MaterialBottomTabs.Screen
        name="Accueil"
        component={Accueil}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: () => <Icon name="home" size={24} color="black" />
        }}
      />
      <MaterialBottomTabs.Screen
        name="Discussions"
        component={Discussions}
        options={{
          tabBarLabel: 'Discussions',
          tabBarIcon: () => <Icon name="message1" size={24} color="black" />
        }}
      />
      <MaterialBottomTabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: () => <Icon name="user" size={24} color="black" />
        }}
      />
    </MaterialBottomTabs.Navigator>
  );
};

const MyMainStack: React.SFC<{ token: string | null }> = ({ token }) => {
  return (
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
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="DetailCategory"
            component={DetailCategory}
            options={({ route }) => ({
              headerShown: true,
              title: route?.params?.category?.name
            })}
          />
          <MainStack.Screen
            name="Discussion"
            component={Discussion}
            options={() => ({ headerShown: false, title: '' })}
          />
          <MainStack.Screen
            name="Reglages"
            component={Reglages}
            options={() => ({ headerShown: true, title: '' })}
          />
          <MainStack.Screen
            name="Avis"
            component={Avis}
            options={() => ({ headerShown: true, title: '' })}
          />
          <MainStack.Screen
            name="Profile"
            component={Profile}
            options={() => ({ headerShown: true, title: '' })}
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
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Discussion"
            component={Discussion}
            options={() => ({ headerShown: false, title: '' })}
          />
          <MainStack.Screen
            name="DetailCategory"
            component={DetailCategory}
            options={({
              route
            }: {
              route: route;
            }): { headerShown: boolean; title: string } => ({
              headerShown: true,
              title: route?.params?.category.name
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
            options={() => ({ headerShown: true, title: '' })}
          />
          <MainStack.Screen
            name="Profile"
            component={Profile}
            options={() => ({ headerShown: true, title: '' })}
          />
        </>
      )}
    </MainStack.Navigator>
  );
};

export default () => {
  const user = useStoreState(state => state.User.user);
  const {
    User: { loadUser },
    Offering: { loadTags },
    ChatMessages: { loadLastMessageReadIds },
    JobAuthorization: { loadJobAuthorizations },
    SendVerifPiecesReferenceIds: { loadsendVerifPiecesReferenceIds }
  } = useStoreActions(actions => actions);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
    loadTags();
    loadLastMessageReadIds();
    loadJobAuthorizations();
    loadsendVerifPiecesReferenceIds();
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) return <BienvenueFirst />;
  return (
    <NavigationContainer>
      <MyMainStack token={user && user.token ? user.token : null} />
    </NavigationContainer>
  );
};

type route = {
  params: { category: { name: string } };
};
