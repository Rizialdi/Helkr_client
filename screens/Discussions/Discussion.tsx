import { AppLoading, Linking } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, View, Platform, AsyncStorage } from 'react-native';
import { Bubble, GiftedChat, SystemMessage } from 'react-native-gifted-chat';
import { graphql, ChildProps } from 'react-apollo';
import gql from 'graphql-tag';

import { Text } from '../shareComponents';

import CustomActions from './components/CustomActions';
import CustomView from './components/CustomView';
import NavBar from './components/NavBar';

const styles = StyleSheet.create({
  container: { flex: 1 }
});

const allMessages = gql`
  query allMessages($id: String!) {
    channel(id: $id) {
      messages {
        id
        text
        createdAt
        sentBy {
          id
        }
      }
    }
  }
`;

const createMessage = gql`
  mutation createMessage(
    $channelId: String
    $recipient: String
    $text: String!
  ) {
    createMessage(channelId: $channelId, recipient: $recipient, text: $text)
  }
`;
interface Props {
  route: { params: { channelId: string; name: string } };
  allMessagesQuery?: any;
  createMessageMutation: ({ variables: variables }) => void;
  navigation: { navigate: () => void };
}

type variables = {
  channelId: string;
  recipient: string;
  text: string;
};

type State = {
  inverted: boolean;
  step: 0;
  messages: [{}];
  loadEarlier: boolean;
  typingText: string;
  isLoadingEarlier: boolean;
  appIsReady: boolean;
  isTyping: boolean;
  placeHolder: string;
  user: { _id: string };
};
class App extends Component<ChildProps<Props, State>, {}> {
  state: State = {
    inverted: false,
    step: 0,
    messages: [{}],
    loadEarlier: true,
    typingText: null,
    isLoadingEarlier: false,
    appIsReady: false,
    isTyping: false,
    placeHolder: 'Ecrivez votre message',
    user: { _id: null }
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    // init with only system messages
    this.getUser().then((value) => {
      this.setState({ user: value });
    });
    this.setState({
      appIsReady: true,
      isTyping: false
    });
    //@ts-ignore
    this.createMessageSubscription = this.props.allMessagesQuery.subscribeToMore(
      {
        document: gql`
          subscription($channelId: String!) {
            newMessage(channelId: $channelId) {
              id
              text
              userId
              createdAt
              channelId
            }
          }
        `,
        variables: { channelId: this.props.route.params.channelId },
        updateQuery: (previousState, { subscriptionData }) => {
          const { data } = subscriptionData;
          const newMessage = this.formattingSubscription(data);

          const newAllMessages = [
            newMessage,
            ...previousState.channel.messages
          ];

          return {
            ...previousState,
            channel: {
              ...previousState.channel,
              messages: newAllMessages
            }
          };
        },
        onError: (err) => {
          throw new Error(err);
        }
      }
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onSend = (messages = []) => {
    this.props.createMessageMutation({
      variables: {
        channelId: this.props.route.params.channelId,
        recipient: '',
        text: messages[0].text
      }
    });
  };

  parsePatterns = (_linkStyle: any) => {
    return [
      {
        pattern: /#(\w+)/,
        style: { textDecorationLine: 'underline', color: 'darkorange' },
        onPress: () => Linking.openURL(`http://google.com`)
      }
    ];
  };

  renderCustomView(props) {
    return <CustomView {...props} />;
  }

  onSendFromUser = (messages = []) => {
    const user = this.state.user;
    const createdAt = new Date();
    const messagesToUpload = messages.map((message) => ({
      ...message,
      user,
      createdAt,
      _id: Math.round(Math.random() * 1000000)
    }));
    this.onSend(messagesToUpload);
  };

  setIsTyping = () => {
    this.setState({
      isTyping: !this.state.isTyping
    });
  };

  renderCustomActions = (props) =>
    Platform.OS === 'web' ? null : (
      <CustomActions {...props} onSend={this.onSendFromUser} />
    );

  renderBubble = (props: any) => {
    return <Bubble {...props} />;
  };

  renderSystemMessage = (props) => {
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

  renderQuickReplySend = () => <Text>{' custom send =>'}</Text>;

  formatting = (data: [{}]) => {
    const newData = data.map((obj) => {
      Object.keys(obj).forEach((key) => {
        if (key === 'createdAt') {
          obj[key] = parseInt(obj[key]);
        }
      });
      return obj;
    });
    const newDataStr = JSON.stringify(newData)
      .replace(/id/g, '_id')
      .replace(/sentBy/g, 'user');
    return JSON.parse(newDataStr);
  };

  formattingSubscription = (data) => {
    const newData = data.newMessage;
    newData.sentBy = { __typename: 'User', id: data.newMessage.userId };

    delete newData.channelId;
    delete newData.userId;
    return newData;
  };
  getUser = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      if (id !== null) return { _id: id };
    } catch (error) {
      throw new Error('Unable to get id');
    }
  };

  render() {
    if (!this.state.appIsReady) {
      return <AppLoading />;
    }

    const { name } = this.props.route.params;
    const user = this.getUser().then((value) => {
      return value;
    });
    let messages;
    if (this.props.allMessagesQuery.channel) {
      messages = this.props.allMessagesQuery.channel.messages;
    }
    return (
      <View style={styles.container} accessible>
        <NavBar nom={name} navigation={this.props.navigation} />
        {messages && (
          <GiftedChat
            messages={this.formatting(messages || [{}])}
            onSend={this.onSend}
            loadEarlier={this.state.loadEarlier}
            isLoadingEarlier={this.state.isLoadingEarlier}
            parsePatterns={this.parsePatterns}
            user={this.state.user}
            scrollToBottom
            onLongPressAvatar={(user) => alert(JSON.stringify(user))}
            onPressAvatar={() => alert('short press')}
            keyboardShouldPersistTaps="never"
            renderActions={this.renderCustomActions}
            placeholder={this.state.placeHolder}
            renderBubble={this.renderBubble}
            renderSystemMessage={this.renderSystemMessage}
            renderCustomView={this.renderCustomView}
            quickReplyStyle={{ borderRadius: 2 }}
            renderQuickReplySend={this.renderQuickReplySend}
            inverted={Platform.OS !== 'web'}
            timeTextStyle={{
              left: { color: 'red' },
              right: { color: 'yellow' }
            }}
          />
        )}
      </View>
    );
  }
}

export default graphql(allMessages, {
  name: 'allMessagesQuery',
  options: (props: { route?: { params: { channelId: string } } }) => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: props.route.params.channelId
    }
  })
})(graphql(createMessage, { name: 'createMessageMutation' })(App));
