import { Action, action, thunk, Thunk } from 'easy-peasy';
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
  loadVibrations: Thunk<PreferencesModel>;
  themeColors: themeInterface;
  changeTheme: Action<PreferencesModel, { themeColors: themeInterface }>;
  changeVibrations: Action<PreferencesModel, { vibrations: boolean }>;
}

const storedData = async () => {
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

const preferences: PreferencesModel = {
  themeColors: lightTheme,
  vibrations: false,
  loadVibrations: thunk(async actions => {
    const vibrations = await storedData();
    actions.changeVibrations({ vibrations });
  }),
  // actions
  changeTheme: action((state, payload) => {
    state.themeColors = payload.themeColors;
  }),
  changeVibrations: action((state, payload) => {
    state.vibrations = payload.vibrations;
    AsyncStorage.setItem('vibrations', payload.vibrations.toString());
  })
};

export default preferences;
