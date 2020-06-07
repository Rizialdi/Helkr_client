import { createStore, createTypedHooks } from 'easy-peasy';

import Preferences, { PreferencesModel } from './Preferences';
import User, { UserModel } from './User';

import Offering, { OfferingModel } from './Offering';

interface StoreModel {
  Preferences: PreferencesModel;
  Offering: OfferingModel;
  User: UserModel;
}

const model: StoreModel = {
  Preferences,
  Offering,
  User
};

const typedHooks = createTypedHooks<StoreModel>();
const store = createStore(model);

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default store;
