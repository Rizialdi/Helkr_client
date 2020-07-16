import { createStore, createTypedHooks } from 'easy-peasy';

import Preferences, { PreferencesModel } from './Preferences';
import User, { UserModel } from './User';

import Offering, { OfferingModel } from './Offering';
import ChatMessages, { ChatMessagesModel } from './ChatMessages';
import JobAuthorization, { JobAuthorizationModel } from './JobAuthorization';
import SendVerifPiecesReferenceIds, {
  SendVerifPiecesReferenceIdsInterfaceModel
} from './SendVerifPiecesReferenceIds';

interface StoreModel {
  SendVerifPiecesReferenceIds: SendVerifPiecesReferenceIdsInterfaceModel;
  JobAuthorization: JobAuthorizationModel;
  ChatMessages: ChatMessagesModel;
  Preferences: PreferencesModel;
  Offering: OfferingModel;
  User: UserModel;
}

const model: StoreModel = {
  SendVerifPiecesReferenceIds,
  JobAuthorization,
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
