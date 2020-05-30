import { Action, action } from 'easy-peasy';

interface themeInterface {
  accent: string;
  primary: string;
  secondary: string;
  tertiary: string;
  black: string;
  white: string;
  gray: string;
  gray2: string;
}

const defaultTheme: themeInterface = {
  accent: '#F3534A',
  primary: '#0094FF',
  secondary: '#2BDA8E',
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
  tertiary: '#9DA3B4',
  black: '#323643',
  white: '#FFFFFF',
  gray: '#9DA3B4',
  gray2: '#C5CCD6'
};

export interface PreferencesModel {
  theme: themeInterface;
  changeTheme: Action<PreferencesModel, { theme } | null>;
}

const preferences: PreferencesModel = {
  theme: defaultTheme,

  // actions
  changeTheme: action((state, payload) => {
    state.theme = payload.theme;
  })
};

export default preferences;
