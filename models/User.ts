import { Action, action, Thunk, thunk } from 'easy-peasy';
import { AsyncStorage } from 'react-native';

interface userContextInterface {
  id?: string;
  token?: string;
  prenom?: string;
  tokenForNotifications?: string;
}

export interface UserModel {
  user: userContextInterface;
  loadUser: Thunk<UserModel>;
  setUser: Action<UserModel, { id: string; token: string; prenom: string }>;
  setTokenForNotifications: Action<
    UserModel,
    { tokenForNotifications: string }
  >;
  setAllUserData: Action<
    UserModel,
    { id: string; token: string; prenom: string; tokenForNotifications: string }
  >;
}

const storedData = async () => {
  try {
    const [
      [, id],
      [, prenom],
      [, token],
      [, tokenForNotifications]
    ] = await AsyncStorage.multiGet([
      'id',
      'prenom',
      'token',
      'tokenForNotifications'
    ]);
    return { id, prenom, token, tokenForNotifications };
  } catch (error) {
    throw new Error('Unable to load Credentials');
  }
};

const user: UserModel = {
  user: {},
  //thunk
  loadUser: thunk(async actions => {
    const data = await storedData();
    actions.setAllUserData(data);
  }),
  // actions
  setUser: action((state, { id, prenom, token }) => {
    state.user = { ...state.user, id, prenom, token };
  }),
  setTokenForNotifications: action((state, { tokenForNotifications }) => {
    state.user = { ...state.user, tokenForNotifications };
  }),
  setAllUserData: action(
    (state, { id, prenom, token, tokenForNotifications }) => {
      state.user = { ...state.user, id, prenom, token, tokenForNotifications };
    }
  )
};

export default user;
