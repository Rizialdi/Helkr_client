import { Action, action, Thunk, thunk } from 'easy-peasy';
import { AsyncStorage } from 'react-native';

interface userContextInterface {
  id: string;
  token: string;
  prenom: string;
}

export interface UserModel {
  user: userContextInterface | null;
  loadUser: Thunk<UserModel>;
  setUser: Action<UserModel, { id; token; prenom } | null>;
}

const storedData = async () => {
  try {
    const [[, id], [, prenom], [, token]] = await AsyncStorage.multiGet([
      'id',
      'prenom',
      'token'
    ]);
    return { id, prenom, token };
  } catch (error) {
    throw new Error('Unable to load Credentials');
  }
};

const user: UserModel = {
  user: null,
  //thunk
  loadUser: thunk(async (actions) => {
    const data = await storedData();
    actions.setUser(data);
  }),
  // actions
  setUser: action((state, { id, prenom, token }) => {
    state.user = { id, prenom, token };
  })
};

export default user;
