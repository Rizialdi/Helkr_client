import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  ImageSourcePropType
} from 'react-native';
import { Layout, Text } from '../shareComponents';

import {
  useAllChatsAndMessagesQuery,
  AllChatsAndMessagesQuery
} from '../../graphql';
import { useStoreState } from '../../models';
import { makePseudoName } from '../../utils';
import {
  useNewMessageSubscription,
  useNewChannelSubscription,
  Channel,
  Utilisateur,
  AllChatsAndMessagesQueryResult
} from '../../graphql/helpkr-types';

const { width } = Dimensions.get('screen');

interface ItemProps {
  name: string;
  lastMessage: string;
  channel: any;
  image: ImageSourcePropType;
  navigation?: any;
}

const Item = ({ name, channel, lastMessage, image, navigation }: ItemProps) => {
  return (
    <>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Discussion', { channel })}>
        <View style={{ flex: 0.25 }}>
          <TouchableOpacity
            style={{
              width: 70,
              height: 70,
              borderRadius: 50,
              overflow: 'hidden',
              margin: 'auto'
            }}>
            <Image
              source={
                image || require('../../assets/images/default-user-image.png')
              }
              resizeMode="cover"
              style={{ width: '100%', height: '100%' }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.75, alignSelf: 'flex-start' }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.message}>{lastMessage}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const Discussions = ({ navigation }: { navigation: any }) => {
  const { user } = useStoreState(state => state.User);
  const [data, setData] = useState<AllChatsAndMessagesQuery>();

  let allChatUsersAndLastMessage: Array<{
    channelId: any;
    userFiltered: any;
    lastMessage: any;
  }> = [];
  let channelIds: string[] = [];

  const {
    data: dataAllChats,
    loading,
    error,
    called
  } = useAllChatsAndMessagesQuery({
    fetchPolicy: 'cache-and-network',
    pollInterval: 1000
  });

  useEffect(() => {
    dataAllChats && !error && setData(dataAllChats);
  }, [dataAllChats]);

  data?.allChatsAndMessages.map(channel => {
    const channelId = channel.id;
    const userFiltered = channel.users.filter(item => item.id !== user.id)[0];
    const lastMessage = channel.messages[0];
    channelIds.push(channelId);
    allChatUsersAndLastMessage.push({
      channelId,
      userFiltered,
      lastMessage
    });
  });

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
        const newData = data?.allChatsAndMessages.map(item => {
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
      userId: user.id
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
  ) => {
    const channel = data.allChatsAndMessages.filter(
      channel => channel.id === channelId
    )[0];
    return channel;
  };

  return (
    <Layout title={'Discussions'}>
      {data ? (
        <FlatList
          data={allChatUsersAndLastMessage}
          renderItem={({ item }) => {
            const user = item.userFiltered;
            return (
              <Item
                name={makePseudoName(user.nom, user.prenom)}
                lastMessage={item?.lastMessage?.text}
                channel={retrieveChannelData(data, item.channelId)}
                image={user.avatar}
                navigation={navigation}
              />
            );
          }}
          keyExtractor={item => item.channelId}
        />
      ) : (
        <Text>Aucune discussion actuellement</Text>
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
    borderBottomColor: 'rgba(0,0,0,0.5)',
    borderBottomWidth: 0.5,
    width: width,
    height: 100
  },
  name: {
    fontFamily: 'josefinRegular',
    fontSize: 20
  },
  message: {
    fontFamily: 'josefinRegular',
    fontSize: 14
  }
});
