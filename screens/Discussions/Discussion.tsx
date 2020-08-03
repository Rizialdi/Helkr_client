import { Feather } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { View, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import NavBar from './components/NavBar';
import {
  formattingTextMessages,
  makePseudoName,
  storeLastMessageReadIds
} from '../../utils';
import { useStoreState, useStoreActions } from '../../models';
import { ChatFragment } from '../../graphql/helpkr-types';
import { SendAMessage } from './Discussions';

import 'moment/locale/fr';

interface Props {
  channel: ChatFragment;
  toOpen: Dispatch<SetStateAction<boolean>>;
  sendAMessage: SendAMessage;
}

const Discussion = ({ channel, toOpen, sendAMessage }: Props) => {
  const [messages, setMessages] = useState<Array<any>>([]);
  const [loadingEarlier, setIsLoadingEarlier] = useState<boolean>(false);
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const { id: channelId } = channel;
  const { id: lastMessageReadId } = channel.messages.sort(
    (a, b) => a.createdAt - b.createdAt
  )[0];

  const { user } = useStoreState(state => state.User);
  const { themeColors } = useStoreState(state => state.Preferences);
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);

  const { lastMessageReadIds } = useStoreState(state => state.ChatMessages);
  const { setLastMessageReadIds } = useStoreActions(
    actions => actions.ChatMessages
  );

  const newLastMessageReadIds = [
    { channelId, lastMessageReadId },
    ...lastMessageReadIds
  ];

  const [data, setData] = useState<ChatFragment>();

  useEffect(() => {
    setData(channel);
  }, [channel]);

  // Finding the name of the interlocutor
  const Data = data ? data : channel;
  const { nom, prenom, id: recipientId } = Data.users.filter(
    item => item.id !== user.id
  )[0];
  const recipient = makePseudoName(nom, prenom);

  useEffect(() => {
    setIsMounted(true);
    setAppIsReady(true);
    storeLastMessageReadIds(newLastMessageReadIds);
  }, []);

  useEffect(() => {
    // To prevent state update after unmounting
    if (isMounted || Data) {
      Data && setMessages(formattingTextMessages(Data));
      setIsLoadingEarlier(false);
      setIsMounted(false);
    }
    setLastMessageReadIds(newLastMessageReadIds);
  }, [isMounted, Data]);

  const onLoadEarlier = () => setIsLoadingEarlier(true);

  let onSend = (messages: Array<any> = [{}]) => {
    const { text } = messages[0];
    sendAMessage(text, channelId, recipientId);
  };

  const parsePatterns = (_linkStyle: any) => {
    return [
      {
        pattern: /#(\w+)/,
        style: {
          textDecorationLine: 'underline',
          color: themeColors.secondary
        },
        onPress: () => Linking.openURL('https://www.google.com')
      }
    ];
  };

  const renderSend = (props: Send['props']) =>
    netWorkStatus && (
      <Send {...props} containerStyle={styles.sendBox}>
        <Feather size={25} color={themeColors.primary} name={'send'} />
      </Send>
    );

  return (
    <>
      {!appIsReady ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <View style={styles.container} accessible>
          <NavBar recipient={recipient} toOpen={toOpen} />
          <GiftedChat
            dateFormat={'d MMM yyyy'}
            placeholder={'Ecrivez un message ...'}
            messages={messages}
            onSend={onSend}
            renderAvatarOnTop={true}
            onLoadEarlier={onLoadEarlier}
            isLoadingEarlier={loadingEarlier}
            parsePatterns={parsePatterns}
            locale={'fr'}
            user={{ _id: user.id as string, name: user.token }}
            scrollToBottom={true}
            maxInputLength={250}
            keyboardShouldPersistTaps="never"
            renderSend={renderSend}
            inverted={Platform.OS !== 'web'}
            timeTextStyle={{
              left: { color: themeColors.primary },
              right: { color: themeColors.secondary }
            }}
          />
        </View>
      )}
    </>
  );
};

export default Discussion;

const styles = StyleSheet.create({
  container: { flex: 1 },
  sendBox: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: 10
  }
});
