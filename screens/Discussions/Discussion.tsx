import { AppLoading, Asset, Linking } from 'expo'
import React, { Component } from 'react'
import { StyleSheet, View, Text, Platform, ActivityIndicator } from 'react-native'
import { Bubble, GiftedChat, SystemMessage } from 'react-native-gifted-chat'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import CustomActions from './components/CustomActions'
import CustomView from './components/CustomView'
import NavBar from './components/NavBar'
import messagesData from './components/data/messages'
import earlierMessages from './components/data/earlierMessages'

const styles = StyleSheet.create({
  container: { flex: 1 },
})

const user = {
  _id: 1,
  name: 'Developer',
}

const otherUser = {
  _id: 2,
  name: 'React Native',
  avatar: 'https://facebook.github.io/react/img/logo_og.png',
}

const DATA = gql`
  query queryMessages($id: String!){
    channel(id: $id) {
    messages {
      id
      text
      createdAt
      sentBy {
        id
        nom
      }
    }
  }
  }
`
export default class App extends Component {
  state = {
    inverted: false,
    step: 0,
    messages: [],
    loadEarlier: true,
    typingText: null,
    isLoadingEarlier: false,
    appIsReady: false,
    isTyping: false,
    locale: 'Fr',
    placeHolder: 'Ecrivez votre message'
  }

  _isMounted = false

  componentDidMount() {
    this._isMounted = true
    // init with only system messages
    this.setState({
      messages: messagesData, // messagesData.filter(message => message.system),
      appIsReady: true,
      isTyping: false,
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  onLoadEarlier = () => {
    this.setState(() => {
      return {
        isLoadingEarlier: true,
      }
    })

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState: any) => {
          return {
            messages: GiftedChat.prepend(
              previousState.messages,
              earlierMessages as any,
              Platform.OS !== 'web',
            ),
            loadEarlier: false,
            isLoadingEarlier: false,
          }
        })
      }
    }, 1000) // simulating network
  }

  onSend = (messages = []) => {
    const step = this.state.step + 1
    this.setState((previousState: any) => {
      const sentMessages = [{ ...messages[0], sent: true, received: true }]
      return {
        messages: GiftedChat.append(
          previousState.messages,
          sentMessages,
          Platform.OS !== 'web',
        ),
        step,
      }
    })
    // for demo purpose
    // setTimeout(() => this.botSend(step), Math.round(Math.random() * 1000))
  }

  parsePatterns = (_linkStyle: any) => {
    return [
      {
        pattern: /#(\w+)/,
        style: { textDecorationLine: 'underline', color: 'darkorange' },
        onPress: () => Linking.openURL(`http://google.com`),
      },
    ]
  }

  renderCustomView(props) {
    return <CustomView {...props} />
  }

  onReceive = (text: string) => {
    this.setState((previousState: any) => {
      return {
        messages: GiftedChat.append(
          previousState.messages as any,
          [
            {
              _id: Math.round(Math.random() * 1000000),
              text,
              createdAt: new Date(),
              user: otherUser,
            },
          ],
          Platform.OS !== 'web',
        ),
      }
    })
  }

  onSendFromUser = (messages = []) => {
    const createdAt = new Date()
    const messagesToUpload = messages.map(message => ({
      ...message,
      user,
      createdAt,
      _id: Math.round(Math.random() * 1000000),
    }))
    this.onSend(messagesToUpload)
  }

  setIsTyping = () => {
    this.setState({
      isTyping: !this.state.isTyping,
    })
  }

  renderCustomActions = props =>
    Platform.OS === 'web' ? null : (
      <CustomActions {...props} onSend={this.onSendFromUser} />
    )

  renderBubble = (props: any) => {
    return <Bubble {...props} />
  }

  renderSystemMessage = props => {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    )
  }

  onQuickReply = replies => {
    const createdAt = new Date()
    if (replies.length === 1) {
      this.onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies[0].title,
          user,
        },
      ])
    } else if (replies.length > 1) {
      this.onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies.map(reply => reply.title).join(', '),
          user,
        },
      ])
    } else {
      console.warn('replies param is not set correctly')
    }
  }

  renderQuickReplySend = () => <Text>{' custom send =>'}</Text>

  render() {
    if (!this.state.appIsReady) {
      return <AppLoading />
    }

    const id = this.props.route.params.channelId
    const { name } = this.props.route.params
    return (
      <Query query={DATA} variables={{ id }} >
        {({ loading, data }) => {
          if (loading) return <ActivityIndicator size='large' color='black' />

          return (
            <View
              style={styles.container}
              accessible
              accessibilityLabel='main'
              testID='main'
            >
              <NavBar nom={name} navigation={this.props.navigation} />
              <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                locale={this.state.locale}
                loadEarlier={this.state.loadEarlier}
                onLoadEarlier={this.onLoadEarlier}
                isLoadingEarlier={this.state.isLoadingEarlier}
                parsePatterns={this.parsePatterns}
                user={user}
                scrollToBottom
                onLongPressAvatar={user => alert(JSON.stringify(user))}
                onPressAvatar={() => alert('short press')}
                onQuickReply={this.onQuickReply}
                keyboardShouldPersistTaps='never'
                renderActions={this.renderCustomActions}
                placeholder={this.state.placeHolder}
                renderBubble={this.renderBubble}
                renderSystemMessage={this.renderSystemMessage}
                renderCustomView={this.renderCustomView}
                quickReplyStyle={{ borderRadius: 2 }}
                renderQuickReplySend={this.renderQuickReplySend}
                inverted={Platform.OS !== 'web'}
                timeTextStyle={{ left: { color: 'red' }, right: { color: 'yellow' } }}
              />
            </View>
          )
        }}
      </Query >
    )
  }
}