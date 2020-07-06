import { Action, action, Thunk, thunk } from 'easy-peasy';
import { AsyncStorage } from 'react-native';

export interface chatMessagesContextInterface {
  channelId: string;
  lastMessageReadId: string;
}

export interface ChatMessagesModel {
  lastMessageReadIds: chatMessagesContextInterface[];
  loadLastMessageReadIds: Thunk<ChatMessagesModel>;
  setLastMessageReadIds: Action<
    ChatMessagesModel,
    chatMessagesContextInterface[]
  >;
}

const storedData = async (): Promise<chatMessagesContextInterface[]> => {
  try {
    const lastMessageReadIds = await AsyncStorage.getItem('lastMessageReadIds');
    if (!lastMessageReadIds) return [];
    return JSON.parse(lastMessageReadIds);
  } catch (error) {
    throw new Error('Unable to load lastMessageReadIds');
  }
};

const ChatMessages: ChatMessagesModel = {
  lastMessageReadIds: [],
  //thunk
  loadLastMessageReadIds: thunk(async actions => {
    const data = await storedData();
    actions.setLastMessageReadIds(data);
  }),
  // actions
  setLastMessageReadIds: action((state, lastMessageReadIds) => {
    state.lastMessageReadIds = lastMessageReadIds;
  })
};

export default ChatMessages;
