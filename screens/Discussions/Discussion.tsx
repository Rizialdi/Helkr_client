import { MaterialIcons } from '@expo/vector-icons';
import { AppLoading, Linking } from 'expo';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import {
  Bubble,
  GiftedChat,
  SystemMessage,
  IMessage,
  Send
} from 'react-native-gifted-chat';
import CustomActions from './components/CustomActions';
import CustomView from './components/CustomView';
import NavBar from './components/NavBar';
import { formattingTextMessages } from '../../utils';
import { useStoreState } from '../../models';
import { locale } from 'dayjs';

const styles = StyleSheet.create({
  container: { flex: 1 }
});

const filterBotMessages = (message: IMessage) =>
  !message.system && message.user && message.user._id && message.user._id === 2;
const findStep = (step: number) => (message: IMessage) => message._id === step;

const otherUser = {
  _id: 2,
  name: 'React Native',
  avatar: 'https://facebook.github.io/react/img/logo_og.png'
};

const Discussion = (props: any) => {
  const [step, setStep] = useState<number>(0);
  const [messages, setMessages] = useState<Array<any>>([]);
  const [loadEarlier, setLoadEarlier] = useState<boolean>(false);
  const [loadingEarlier, setIsLoadingEarlier] = useState<boolean>(false);
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const { user } = useStoreState(state => state.User);

  useEffect(() => {
    setIsMounted(true);
    setAppIsReady(true);
    setIsTyping(false);
    props?.route?.params?.channel &&
      setMessages(formattingTextMessages(props?.route?.params?.channel));
  }, []);

  useEffect(() => {
    isMounted === true && setIsMounted(!isMounted);
  }, [isMounted]);

  const onLoadEarlier = () => setIsLoadingEarlier(true);

  setTimeout(() => {
    if (isMounted === true) {
      setMessages(
        GiftedChat.prepend(
          messages,
          [] as IMessage[], //earlier messages
          Platform.OS !== 'web'
        )
      );
      setLoadEarlier(true);
      setIsLoadingEarlier(false);
    }
  }, 1500); // simulating network

  let onSend = (messages: Array<any> = [{}]) => {
    const sentMessages = [{ ...messages[0], sent: true, received: true }];
    setMessages(
      GiftedChat.prepend(messages, sentMessages, Platform.OS !== 'web')
    );
    setStep(step + 1);
  };
  // for demo purpose
  // setTimeout(() => this.botSend(step), Math.round(Math.random() * 1000))

  const botSend = (step = 0) => {
    const newMessage = ([] as IMessage[])
      .reverse()
      // .filter(filterBotMessages)
      .find(findStep(step));
    if (newMessage) {
      setMessages(
        GiftedChat.prepend(messages, [newMessage], Platform.OS !== 'web')
      );
    }
  };

  const parsePatterns = (_linkStyle: any) => {
    return [
      {
        pattern: /#(\w+)/,
        style: { textDecorationLine: 'underline', color: 'darkorange' },
        onPress: () => Linking.openURL('http://gifted.chat')
      }
    ];
  };

  const renderCustomView = (props: any) => {
    return <CustomView {...props} />;
  };

  const onReceive = (text: string) => {
    setMessages(
      GiftedChat.prepend(
        messages,
        [
          {
            _id: Math.round(Math.random() * 1000000),
            text,
            createdAt: new Date(),
            user: otherUser
          }
        ],
        Platform.OS !== 'web'
      )
    );
  };

  const onSendFromUser = (messages: IMessage[] = []) => {
    const createdAt = new Date();
    const messagesToUpload = messages.map(message => ({
      ...message,
      user,
      createdAt,
      _id: Math.round(Math.random() * 1000000)
    }));
    onSend(messagesToUpload);
  };

  const setIsTypingFunction = () => {
    setIsTyping(!isTyping);
  };

  const renderCustomActions = (props: any) =>
    Platform.OS === 'web' ? null : (
      <CustomActions {...props} onSend={onSendFromUser} />
    );

  const renderBubble = (props: any) => {
    return <Bubble {...props} />;
  };

  const renderSystemMessage = (props: any) => {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15
        }}
        textStyle={{
          fontSize: 14
        }}
      />
    );
  };

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

  const renderQuickReplySend = () => <Text>{' custom send =>'}</Text>;

  const renderSend = (props: Send['props']) => (
    <Send {...props} containerStyle={{ justifyContent: 'center' }}>
      <MaterialIcons size={30} color={'tomato'} name={'send'} />
    </Send>
  );

  return (
    <>
      {!appIsReady ? (
        <AppLoading />
      ) : (
        <View style={styles.container} accessible>
          <NavBar />
          <GiftedChat
            messages={messages}
            onSend={onSend}
            loadEarlier={loadEarlier}
            onLoadEarlier={onLoadEarlier}
            isLoadingEarlier={loadingEarlier}
            parsePatterns={parsePatterns}
            locale={locale('fr-ca', {}, true)}
            user={{ _id: user.id, name: user.token }}
            scrollToBottom
            onLongPressAvatar={user => alert(JSON.stringify(user))}
            onPressAvatar={() => alert('short press')}
            onQuickReply={onQuickReply}
            keyboardShouldPersistTaps="never"
            renderActions={renderCustomActions}
            renderBubble={renderBubble}
            renderSystemMessage={renderSystemMessage}
            renderCustomView={renderCustomView}
            renderSend={renderSend}
            quickReplyStyle={{ borderRadius: 2 }}
            renderQuickReplySend={renderQuickReplySend}
            inverted={Platform.OS !== 'web'}
            timeTextStyle={{
              left: { color: 'red' },
              right: { color: 'yellow' }
            }}
          />
        </View>
      )}
    </>
  );
};

export default Discussion;
