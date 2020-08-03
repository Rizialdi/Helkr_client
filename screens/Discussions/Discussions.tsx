import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Modal
} from 'react-native';
import { Layout, Text, Block, ImageComponent } from '../sharedComponents';

import {
  useAllChatsAndMessagesQuery,
  AllChatsAndMessagesQuery
} from '../../graphql';
import { useStoreState } from '../../models';
import { makePseudoName, sortChatMessages, formatDate } from '../../utils';
import {
  Message,
  ChatFragment,
  useCreateMessageMutation
} from '../../graphql/helpkr-types';
import {
  useNewMessageSubscription,
  useNewChannelSubscription,
  Utilisateur
} from '../../graphql/helpkr-types';
import Discussion from './Discussion';
const { width } = Dimensions.get('screen');
const HEIGHT = 100;
type Chat = { __typename?: 'channel' } & ChatFragment;
interface ItemProps {
  name: string;
  lastMessageText: string;
  lastMessageDate: string;
  unReadMessageCount: number | null;
  channel: Chat;
  image: string;
  sendAMessage: SendAMessage;
}

export type SendAMessage = (
  text: string,
  channelId?: string,
  recipient?: string
) => void;

const Item = ({
  name,
  channel,
  lastMessageText,
  lastMessageDate,
  unReadMessageCount,
  image,
  sendAMessage
}: ItemProps) => {
  const [openDiscussionScreen, setOpenDiscussionScreen] = useState<boolean>(
    false
  );
  const [dataToChild, setDataToChild] = useState<Chat>();
  const { themeColors } = useStoreState(state => state.Preferences);

  useEffect(() => {
    setDataToChild(channel);
  }, [channel]);

  const colorCondition = !!(unReadMessageCount && unReadMessageCount > 0);

  return (
    <>
      <TouchableOpacity
        style={styles.item2}
        onPress={() => setOpenDiscussionScreen(true)}>
        <View style={{ flex: 0.22 }}>
          <TouchableOpacity
            style={{
              width: 70,
              height: 70,
              borderRadius: 50,
              overflow: 'hidden',
              margin: 'auto'
            }}>
            <ImageComponent image={image} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.78,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingRight: 5
          }}>
          <View style={{ flex: 0.85 }}>
            <View style={styles.secondBlock}>
              <View>
                <Text h2>{name}</Text>
              </View>
              <View>
                <Text medium gray2={!colorCondition}>
                  {lastMessageText}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 0.15,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <View style={styles.thirdBlock}>
              <View style={[styles.time]}>
                <Text center caption>
                  {formatDate(lastMessageDate)}
                </Text>
              </View>
              <View
                style={[
                  styles.messageCount,
                  colorCondition && { backgroundColor: themeColors.primary }
                ]}>
                {colorCondition ? (
                  <Text center white medium>
                    {JSON.stringify(unReadMessageCount)}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        hardwareAccelerated={true}
        presentationStyle="overFullScreen"
        visible={openDiscussionScreen}>
        <Block padding={[20, 0]}>
          {channel && (
            <Discussion
              channel={dataToChild as ChatFragment}
              toOpen={setOpenDiscussionScreen}
              sendAMessage={sendAMessage}
            />
          )}
        </Block>
      </Modal>
    </>
  );
};

const Discussions = () => {
  const { user } = useStoreState(state => state.User);
  const { lastMessageReadIds } = useStoreState(state => state.ChatMessages);

  const [data, setData] = useState<AllChatsAndMessagesQuery>();

  let allChatUsersAndLastMessage: Array<{
    channelId: string;
    userFiltered: {
      __typename?: 'utilisateur' | undefined;
    } & {
      __typename?: 'utilisateur' | undefined;
    } & Pick<Utilisateur, 'id' | 'prenom' | 'nom' | 'avatar'>;
    lastMessage: {
      __typename?: 'message' | undefined;
    } & {
      __typename?: 'message' | undefined;
    } & Pick<Message, 'text' | 'id' | 'createdAt' | 'sentById'>;
    unReadMessageCount: number | null;
  }> = [];

  let channelIds: string[] = [];

  const { data: dataAllChats, loading, error } = useAllChatsAndMessagesQuery({
    fetchPolicy: 'cache-and-network',
    pollInterval: 1000
  });

  const [mutation] = useCreateMessageMutation();

  const sendAMessage: SendAMessage = (text = '', channelId, recipient) => {
    mutation({ variables: { channelId, recipient, text } });
  };

  useEffect(() => {
    !loading && dataAllChats && !error && setData(dataAllChats);
  }, [dataAllChats]);

  if (data && data?.allChatsAndMessages) {
    data?.allChatsAndMessages?.map(channel => {
      const channelId = channel.id;
      const lastMessageReadIdAndChannel = lastMessageReadIds.filter(
        item => item.channelId === channelId
      )[0];
      const userFiltered = channel.users.filter(item => item.id !== user.id)[0];
      const lastMessage = channel.messages[0];
      const unReadMessageCount = lastMessageReadIdAndChannel
        ? channel.messages.findIndex(
            message =>
              message.id === lastMessageReadIdAndChannel?.lastMessageReadId
          )
        : channel.messages.length;

      channelIds.push(channelId);
      allChatUsersAndLastMessage.push({
        channelId,
        userFiltered,
        lastMessage,
        unReadMessageCount
      });
    });
  }

  // Some channelIds are found after looping through allChatsAndMessages

  if (channelIds) {
    const {
      data: dataUpdateMessages,
      error: errorUpdateMessages
    } = useNewMessageSubscription({
      variables: {
        channelIds: channelIds
      },
      shouldResubscribe: true
    });

    useEffect(() => {
      if (
        dataUpdateMessages &&
        data?.allChatsAndMessages &&
        dataUpdateMessages.newMessage &&
        !errorUpdateMessages
      ) {
        const newData = data?.allChatsAndMessages?.map(item => {
          if (item.id === dataUpdateMessages?.newMessage.channelId) {
            const {
              channelId: _,
              ...newMessage
            } = dataUpdateMessages?.newMessage;
            return {
              ...item,
              messages: [newMessage, ...item.messages]
            };
          }
          return {
            item
          };
        });
        //@ts-ignore
        setData(newData);
      }
    }, [dataUpdateMessages]);
  }

  const {
    data: dataUpdateChannels,
    error: errorUpdateChannels
  } = useNewChannelSubscription({
    variables: {
      userId: user.id as string
    },
    shouldResubscribe: true
  });

  useEffect(() => {
    if (
      dataUpdateChannels &&
      data?.allChatsAndMessages &&
      !errorUpdateChannels
    ) {
      const newData = {
        ...dataAllChats,
        allChatsAndMessages: [
          dataUpdateChannels.newChannel,
          ...data?.allChatsAndMessages
        ]
      };
      setData(newData);
    }
  }, [dataUpdateChannels]);

  const retrieveChannelData = (
    data: AllChatsAndMessagesQuery,
    channelId: string
  ): Chat => {
    const channel = data?.allChatsAndMessages?.filter(
      channel => channel.id === channelId
    )[0];
    return channel;
  };

  return (
    <Layout title={'Discussions'}>
      {data && allChatUsersAndLastMessage.length ? (
        <FlatList
          data={sortChatMessages(allChatUsersAndLastMessage)}
          renderItem={({ item }) => {
            const user = item.userFiltered;
            return (
              <Item
                name={makePseudoName(user.nom, user.prenom)}
                lastMessageText={item?.lastMessage?.text}
                lastMessageDate={item.lastMessage.createdAt}
                channel={retrieveChannelData(data, item.channelId)}
                unReadMessageCount={item?.unReadMessageCount}
                image={user.avatar as string}
                sendAMessage={sendAMessage}
              />
            );
          }}
          keyExtractor={item => item.channelId}
        />
      ) : (
        <Block flex={false}>
          <Text semibold horizontal={35} vertical={[20, 20]} numberOfLines={1}>
            Vous n'avez aucune discussion actuellement.
          </Text>
        </Block>
      )}
    </Layout>
  );
};

export default Discussions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 10
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginVertical: 0,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: width,
    height: HEIGHT
  },
  item2: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 0,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: width,
    height: HEIGHT
  },
  secondBlock: {
    justifyContent: 'space-between',
    alignItems: 'baseline',
    textAlignVertical: 'bottom',
    height: HEIGHT - 2 * 15,
    paddingVertical: 7
  },
  thirdBlock: {
    justifyContent: 'space-between',
    textAlignVertical: 'bottom',
    height: HEIGHT - 2 * 15,
    paddingVertical: 7,
    alignItems: 'center'
  },
  name: { backgroundColor: 'red' },
  message: { backgroundColor: 'yellow' },
  time: {},
  messageCount: {
    borderRadius: 50,
    height: 22,
    width: 22,
    justifyContent: 'center'
  }
});
