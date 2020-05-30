import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useStoreActions, useStoreState } from '../models';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import { theme } from '../constants';
import Accueil from '../screens/Accueil';
import Avis from '../screens/Avis';
import BienvenueFirst from '../screens/BienvenueFirst';
import DetailCategory from '../screens/DetailCategory';
import Discussion from '../screens/Discussions/Discussion';
import Discussions from '../screens/Discussions/Discussions';
import Enregistrement from '../screens/Enregistrement';
import Identification from '../screens/Identification';
import Postuler from '../screens/Postuler';
import Profile from '../screens/Profile/Profile';
import Publier from '../screens/Publier';
import Reglages from '../screens/Reglages';
import Screen from '../screens/Screen';
import Verification from '../screens/Verification';

const MainStack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();

const createBottomTabs = () => {
  return (
    <MaterialBottomTabs.Navigator
      initialRouteName="Accueil"
      activeColor={theme.colors.primary}
      sceneAnimationEnabled={true}
      backBehavior={'initialRoute'}
      shifting={true}
      barStyle={{ backgroundColor: theme.colors.white, height: 50 }}
    >
      <MaterialBottomTabs.Screen
        name="Publier"
        component={Publier}
        options={{
          tabBarLabel: 'Publier',
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

const MyMainStack = ({ token }) => {
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
      }}
    >
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
            options={({ route }: route) => ({
              headerShown: true,
              title: route.params.category.name
            })}
          />
          <MainStack.Screen
            name="Discussion"
            component={Discussion}
            options={({ route }) => ({ headerShown: false, title: '' })}
          />
          <MainStack.Screen
            name="Reglages"
            component={Reglages}
            options={({ route }) => ({ headerShown: true, title: '' })}
          />
          <MainStack.Screen
            name="Avis"
            component={Avis}
            options={({ route }) => ({ headerShown: true, title: '' })}
          />
          <MainStack.Screen
            name="ProfilesNavigation"
            component={Profile}
            options={({ route }) => ({ headerShown: true, title: '' })}
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
            options={({ route }) => ({ headerShown: false, title: '' })}
          />
          <MainStack.Screen
            name="DetailCategory"
            component={DetailCategory}
            options={({ route }: route) => ({
              headerShown: true,
              title: route.params.category.name
            })}
          />
          <MainStack.Screen
            name="Reglages"
            component={Reglages}
            options={({ route }) => ({ headerShown: true, title: '' })}
          />
          <MainStack.Screen
            name="Avis"
            component={Avis}
            options={({ route }) => ({ headerShown: true, title: '' })}
          />
          <MainStack.Screen
            name="ProfilesNavigation"
            component={Profile}
            options={({ route }) => ({ headerShown: true, title: '' })}
          />
        </>
      )}
    </MainStack.Navigator>
  );
};

export default () => {
  const user = useStoreState((state) => state.User.user);
  const { loadUser } = useStoreActions((actions) => actions.User);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
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
  route: {
    params;
  };
};
