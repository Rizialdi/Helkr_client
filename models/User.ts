import { Action, action, Thunk, thunk } from 'easy-peasy';
import { AsyncStorage } from 'react-native';

export interface userContextInterface {
  id: string;
  token: string;
  prenom: string;
}

export interface User {
  user: userContextInterface | null;
  loadUser: Thunk<User, { id; token; prenom } | null>;
  setUser: Action<User, { id; token; prenom } | null>;
}

const storedData = async () => {
  try {
    const id = await AsyncStorage.getItem('id');
    const prenom = await AsyncStorage.getItem('prenom');
    const token = await AsyncStorage.getItem('token');
    console.log(id, prenom, token);
    return { id, prenom, token };
  } catch (error) {
    throw new Error('Unable to load Credentials');
  }
};

const user: User = {
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
