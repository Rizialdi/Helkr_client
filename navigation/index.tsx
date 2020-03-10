import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {theme} from '../constants'
import Image from 'react-native-remote-svg';

import Accueil from '../screens/Accueil';
import Discussions from '../screens/Discussions';
import Postuler from '../screens/Postuler';
import Profile from '../screens/Profile';
import Publier from '../screens/Publier';
import DetailCategory from '../screens/DetailCategory'
import BienvenueFirst from '../screens/BienvenueFirst';
import Identification from '../screens/Identification';
import Enregistrement from '../screens/Enregistrement';
import Verification from '../screens/Verification';

import Screen from '../screens/Screen'

const MainStack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();

const createBottomTabs = () => {
  return (
    <MaterialBottomTabs.Navigator
      initialRouteName="Postuler"
      activeColor={theme.colors.primary}
      shifting={true}
      barStyle={{ backgroundColor: 'rgba(196, 196, 196, 0.1)', height: 60 }}
    >
      <MaterialBottomTabs.Screen
        name="Publier"
        component={Publier}
        options={{
          tabBarLabel: 'Publier',
          tabBarIcon: () => (
            <Icon name="pluscircleo" size={24} color="black" />
          )
        }}
      />
      <MaterialBottomTabs.Screen name="Postuler" component={Postuler}
        options={{
          tabBarLabel: 'Postuler',
          tabBarIcon: () => (
            <Image
              source={require('../assets/icons/choice.svg')}
              style={{ width: 30, height: 30 }}
            />
          )
        }}
      />
      <MaterialBottomTabs.Screen name="Accueil" component={Accueil}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: () => (
            <Icon name="home" size={24} color="black" />
          ),
        }}
      />
      <MaterialBottomTabs.Screen name="Discussions" component={Discussions}
        options={{
          tabBarLabel: 'Discussions',
          tabBarIcon: () => (
            <Image
              source={require('../assets/icons/chat.svg')}
              style={{ width: 24, height: 24 }}
            />
           ),
        }}
      />
      <MaterialBottomTabs.Screen name="Profile" component={Profile}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: () => (
            <Image
              source={require('../assets/icons/profile.svg')}
              style={{ width: 24, height: 24 }}
            />  
          ),
        }}
      />
    </MaterialBottomTabs.Navigator>
  )
}

const MyMainStack = () => {
  return (
    <MainStack.Navigator
      initialRouteName='Screen'
      headerMode="screen"
      screenOptions={{
        headerTintColor: 'black',
        headerTitleStyle: {
          color: "black",
          alignSelf: "center",
          fontSize: 10,
        },
    }}>
      {/* <MainStack.Screen name="Screen" component={Screen} options={{ headerShown: false }} />  */}
      <MainStack.Screen name="Enregistrement" component={Enregistrement} options={{ headerShown: false }} />
      <MainStack.Screen name="Identification" component={Identification} options={{ headerShown: false }} />
      <MainStack.Screen name="Verification" component={Verification} options={{ headerShown: false }} />
      <MainStack.Screen name="PrincipalView" children={createBottomTabs} options={{ headerShown: false }} />
      {/* <MainStack.Screen name="DetailCategory" component={DetailCategory} options={{ headerShown: true }} /> */}
    </MainStack.Navigator>
  )
}

export default () => {
  return (
    <NavigationContainer>
      <MyMainStack />
    </NavigationContainer>
  )
}