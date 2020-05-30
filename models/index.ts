import { createStore, createTypedHooks } from 'easy-peasy';

import Preferences, { PreferencesModel } from './Preferences';
import User, { UserModel } from './User';

// import Offering from './Offering';
interface StoreModel {
  Preferences: PreferencesModel;
  User: UserModel;
}

const model: StoreModel = {
  Preferences,
  User
};

const typedHooks = createTypedHooks<StoreModel>();
const store = createStore(model);

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default store;
