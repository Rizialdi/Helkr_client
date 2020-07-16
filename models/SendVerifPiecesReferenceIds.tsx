import { AsyncStorage } from 'react-native';
import { Action, action, Thunk, thunk } from 'easy-peasy';
import {
  GetSendVerificationPiecesReferenceIdsAndStatusQuery,
  GetSendVerificationPiecesReferenceIdsAndStatusDocument
} from '../graphql';
import client from '../ApolloClient';

type SendVerifPiecesReferenceIdsInterface = { [referenceId: string]: string };

export interface SendVerifPiecesReferenceIdsInterfaceModel {
  sendVerifPiecesReferenceIds: SendVerifPiecesReferenceIdsInterface;
  loadsendVerifPiecesReferenceIds: Thunk<
    SendVerifPiecesReferenceIdsInterfaceModel
  >;
  setsendVerifPiecesReferenceIds: Action<
    SendVerifPiecesReferenceIdsInterfaceModel,
    SendVerifPiecesReferenceIdsInterface
  >;
}

const storedOrFetchedData = async (): Promise<
  SendVerifPiecesReferenceIdsInterface
> => {
  try {
    let sendVerifPiecesReferenceIds = '';

    await client
      .query<GetSendVerificationPiecesReferenceIdsAndStatusQuery>({
        query: GetSendVerificationPiecesReferenceIdsAndStatusDocument,
        fetchPolicy: 'no-cache',
        variables: { id: '' }
      })
      .then(data => {
        return data;
      })
      .then(async ({ data }) => {
        sendVerifPiecesReferenceIds =
          data.getSendVerificationPiecesReferenceIdsAndStatus;
        if (sendVerifPiecesReferenceIds) {
          await AsyncStorage.setItem(
            'sendVerifPiecesReferenceIds',
            sendVerifPiecesReferenceIds
          );
        }
      })
      .catch(err => {
        throw new Error(`${err}`);
      })
      .finally(async () => {
        sendVerifPiecesReferenceIds = sendVerifPiecesReferenceIds
          ? sendVerifPiecesReferenceIds
          : ((await AsyncStorage.getItem(
              'sendVerifPiecesReferenceIds'
            )) as string);
      });

    const toReturn = JSON.parse(sendVerifPiecesReferenceIds);

    if (!toReturn) return {};
    return toReturn;
  } catch (error) {
    throw new Error('Error loading sendVerifPiecesReferenceIds');
  }
};

const SendVerifPiecesReferenceIds: SendVerifPiecesReferenceIdsInterfaceModel = {
  sendVerifPiecesReferenceIds: {},
  loadsendVerifPiecesReferenceIds: thunk(async actions => {
    const data = await storedOrFetchedData();
    actions.setsendVerifPiecesReferenceIds(data);
  }),
  setsendVerifPiecesReferenceIds: action(
    (state, sendVerifPiecesReferenceIds) => {
      state.sendVerifPiecesReferenceIds = sendVerifPiecesReferenceIds;
    }
  )
};

export default SendVerifPiecesReferenceIds;
