import { Action, action, thunk, Thunk } from 'easy-peasy';
import * as Notifications from 'expo-notifications';
import { AsyncStorage } from 'react-native';
interface themeInterface {
  accent: string;
  primary: string;
  secondary: string;
  background: string;
  defaultTextColor: string;
  tertiary: string;
  black: string;
  white: string;
  gray: string;
  gray2: string;
}

const lightTheme: themeInterface = {
  accent: '#F3534A',
  primary: '#0094FF',
  secondary: '#2BDA8E',
  background: '#FFFFFF',
  defaultTextColor: '#000',
  tertiary: '#FFE358',
  black: '#323643',
  white: '#FFFFFF',
  gray: '#9DA3B4',
  gray2: '#C5CCD6'
};

const darkTheme: themeInterface = {
  accent: '#9DA3B4',
  primary: '#9DA3B4',
  secondary: '#9DA3B4',
  background: '#000',
  defaultTextColor: '#FFFFFF',
  tertiary: '#9DA3B4',
  black: '#323643',
  white: '#000',
  gray: '#9DA3B4',
  gray2: '#C5CCD6'
};

export interface PreferencesModel {
  vibrations: boolean;
  notifications: boolean;
  loadVibrations: Thunk<PreferencesModel>;
  loadNotifications: Thunk<PreferencesModel>;
  themeColors: themeInterface;
  changeTheme: Action<PreferencesModel, { themeColors: themeInterface }>;
  changeVibrations: Action<PreferencesModel, { vibrations: boolean }>;
  changeNotifications: Action<PreferencesModel, { notifications: boolean }>;
}

const storedVibrationsValue = async () => {
  try {
    const vibrations = await AsyncStorage.getItem('vibrations');
    if (vibrations?.length) {
      return vibrations === 'true';
    }
    return true;
  } catch (error) {
    throw new Error('Unable to load Credentials');
  }
};

const storedNotificationsValue = async () => {
  try {
    const notifications = await AsyncStorage.getItem('notifications');
    if (notifications?.length) {
      return notifications === 'true';
    }
    return true;
  } catch (error) {
    throw new Error('Unable to load Credentials');
  }
};

const preferences: PreferencesModel = {
  themeColors: lightTheme,
  vibrations: false,
  notifications: false,
  loadVibrations: thunk(async actions => {
    const vibrations = await storedVibrationsValue();
    actions.changeVibrations({ vibrations });
  }),
  loadNotifications: thunk(async actions => {
    const notifications = await storedNotificationsValue();
    actions.changeNotifications({ notifications });
  }),
  // actions
  changeTheme: action((state, payload) => {
    state.themeColors = payload.themeColors;
  }),
  changeVibrations: action((state, payload) => {
    state.vibrations = payload.vibrations;
    AsyncStorage.setItem('vibrations', payload.vibrations.toString());
  }),
  changeNotifications: action((state, payload) => {
    state.notifications = payload.notifications;
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: payload.notifications,
        shouldPlaySound: true,
        shouldSetBadge: false
      })
    });
    AsyncStorage.setItem('notifications', payload.notifications.toString());
  })
};

export default preferences;
