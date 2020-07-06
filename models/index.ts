import { createStore, createTypedHooks } from 'easy-peasy';

import Preferences, { PreferencesModel } from './Preferences';
import User, { UserModel } from './User';

import Offering, { OfferingModel } from './Offering';
import ChatMessages, { ChatMessagesModel } from './ChatMessages';

interface StoreModel {
  ChatMessages: ChatMessagesModel;
  Preferences: PreferencesModel;
  Offering: OfferingModel;
  User: UserModel;
}

const model: StoreModel = {
  ChatMessages,
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
