import { MaterialIcons } from '@expo/vector-icons';
import { Linking } from 'expo';
import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  ActivityIndicator
} from 'react-native';
import {
  // Bubble,
  GiftedChat,
  // SystemMessage,
  // IMessage,
  Send
} from 'react-native-gifted-chat';
// import CustomActions from './components/CustomActions';
import CustomView from './components/CustomView';
import NavBar from './components/NavBar';
import {
  formattingTextMessages,
  makePseudoName,
  storeLastMessageReadIds
} from '../../utils';
import { useStoreState, useStoreActions } from '../../models';
import { locale } from 'dayjs';
import { ChatFragment } from '../../graphql/helpkr-types';
import { SendAMessage } from './Discussions';
interface Props {
  channel: ChatFragment;
  toOpen: Dispatch<SetStateAction<boolean>>;
  sendAMessage: SendAMessage;
}

const Discussion = ({ channel, toOpen, sendAMessage }: Props) => {
  const [messages, setMessages] = useState<Array<any>>([]);
  const [loadEarlier, setLoadEarlier] = useState<boolean>(false);
  const [loadingEarlier, setIsLoadingEarlier] = useState<boolean>(false);
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const { id: channelId } = channel;
  const { id: lastMessageReadId } = channel.messages.sort(
    (a, b) => a.createdAt - b.createdAt
  )[0];

  const { user } = useStoreState(state => state.User);
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
      setLoadEarlier(true);
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
        style: { textDecorationLine: 'underline', color: 'darkorange' },
        onPress: () => Linking.openURL('https://www.google.com')
      }
    ];
  };

  const renderCustomView = (props: any) => {
    return <CustomView {...props} />;
  };

  // const onSendFromUser = (messages: IMessage[] = []) => {
  //   const createdAt = new Date();
  //   const messagesToUpload = messages.map(message => ({
  //     ...message,
  //     user,
  //     createdAt,
  //     _id: Math.round(Math.random() * 1000000)
  //   }));
  //   onSend(messagesToUpload);
  // };

  // const renderCustomActions = (props: any) =>
  //   Platform.OS === 'web' ? null : (
  //     <CustomActions {...props} onSend={onSendFromUser} />
  //   );

  // const renderBubble = (props: any) => {
  //   return <Bubble {...props} />;
  // };

  // const renderSystemMessage = (props: any) => {
  //   return (
  //     <SystemMessage
  //       {...props}
  //       containerStyle={{
  //         marginBottom: 15
  //       }}
  //       textStyle={{
  //         fontSize: 14
  //       }}
  //     />
  //   );
  // };

  const onQuickReply = (replies: Array<{ title: string }> = []) => {
    const createdAt = new Date();
    if (replies.length === 1) {
      onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies[0].title,
          user
        }
      ]);
    } else if (replies.length > 1) {
      onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies.map(reply => reply.title).join(', '),
          user
        }
      ]);
    } else {
      console.warn('replies param is not set correctly');
    }
  };

  const renderQuickReplySend = () => <Text>{' custom send =>'} </Text>;

  const renderSend = (props: Send['props']) => (
    <Send {...props} containerStyle={{ justifyContent: 'center' }}>
      <MaterialIcons size={30} color={'tomato'} name={'send'} />
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
            messages={messages}
            onSend={onSend}
            loadEarlier={loadEarlier}
            onLoadEarlier={onLoadEarlier}
            isLoadingEarlier={loadingEarlier}
            parsePatterns={parsePatterns}
            locale={locale('fr-ca', {}, true)}
            user={{ _id: user.id as string, name: user.token }}
            scrollToBottom
            onLongPressAvatar={user => alert(JSON.stringify(user))}
            onPressAvatar={() => alert('short press')}
            onQuickReply={onQuickReply}
            keyboardShouldPersistTaps="never"
            // renderActions={renderCustomActions}
            // renderBubble={renderBubble}
            // renderSystemMessage={renderSystemMessage}
            renderCustomView={renderCustomView}
            renderSend={renderSend}
            quickReplyStyle={{ borderRadius: 2 }}
            renderQuickReplySend={renderQuickReplySend}
            inverted={Platform.OS !== 'web'}
            timeTextStyle={{
              left: { color: 'green' },
              right: { color: 'yellow' }
            }}
          />
        </View>
      )}
    </>
  );
};

export default Discussion;

const styles = StyleSheet.create({
  container: { flex: 1 }
});
