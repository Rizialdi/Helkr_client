import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

import { Text } from '../shareComponents';
import {
  AvgContainer,
  Description,
  ProfilContainer,
  StatsContainer,
  Tag
} from './components';

const STATS = gql`
  query getUserStats($id: String!) {
    getUserStats(id: $id) {
      done
      proposed
      average
    }
  }
`;

const INFO = gql`
  query userById($id: String!) {
    userById(id: $id) {
      nom
      tags
      prenom
      avatar
      address
      verified
      description
      professional
    }
  }
`;
export default function Profile({ navigation, route: { params } }) {
  const [Id, setId] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const id = await AsyncStorage.getItem('id');
        setId(id);
      } catch (error) {
        throw new Error('Unable to load Credentials');
      }
    })();
  }, []);

  const id = params && params.id ? params.id : Id;

  const {
    data: {
      getUserStats: { done, proposed, average } = {
        done: 0,
        proposed: 0,
        average: 0
      }
    } = {}
  } = useQuery(STATS, {
    variables: { id },
    errorPolicy: 'ignore',
    fetchPolicy: 'cache-and-network',
    pollInterval: 1000 * 3600 * 24
  });

  const {
    data: {
      userById: {
        nom,
        tags,
        prenom,
        avatar,
        address,
        description,
        verified,
        professional
      } = {
        nom: 'John',
        prenom: 'Doe',
        tags: ['_'],
        avatar: null,
        address: '_',
        description: '_',
        verified: false,
        professional: false
      }
    } = {},
    //refetch,
    loading
  } = useQuery(INFO, {
    variables: { id },
    errorPolicy: 'ignore',
    fetchPolicy: 'cache-and-network',
    pollInterval: 100 * 3600 * 24
  });

  // useEffect(() => {
  //   params && params.updatedSettings
  //     ? (() => {
  //         // TODO thereis an issue with refetch in the docs
  //         refetch ? refetch() : null;
  //       })()
  //     : null;
  // }, [params]);

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View
          style={{
            zIndex: 99,
            position: 'absolute',
            top: '50%',
            marginHorizontal: '50%'
          }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={true}>
        {params && params.id ? null : (
          <TouchableOpacity
            style={styles.titleBar}
            onPress={() => navigation.navigate('Reglages')}
          >
            <Icon name="gear" size={24} color="#52575D" />
          </TouchableOpacity>
        )}
        <ProfilContainer
          image={
            avatar
              ? { uri: avatar }
              : require('../../assets/images/default-user-image.png')
          }
          username={
            prenom.replace(/^./, prenom[0].toUpperCase()) +
            ' ' +
            nom.charAt(0) +
            '.'
          }
          address={address}
          verified={verified}
          pro={professional}
        />
        <StatsContainer done={done} proposed={proposed} average={average} />
        <View style={styles.delimiter}></View>
        <Description description={description} />
        <View style={styles.delimiter}></View>
        <TouchableOpacity
          style={styles.lineStars}
          disabled={done === 0}
          onPress={() =>
            navigation.navigate('Avis', {
              id: id
            })
          }
        >
          <AvgContainer average={average} done={done} />
          {done > 0 && <Icon name="chevron-right" size={24} color="#52575D" />}
        </TouchableOpacity>
        <View style={styles.delimiter}></View>
        <View>
          <Text
            style={[
              styles.text,
              {
                fontWeight: '300',
                fontSize: 24,
                paddingLeft: 20
              }
            ]}
          >
            Tags
          </Text>
          <Tag tags={tags} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF'
  },
  text: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D'
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
    marginHorizontal: 16
  },
  delimiter: {
    borderTopColor: '#DFD8C8',
    borderTopWidth: 0.5,
    marginTop: 25
  },
  lineStars: {
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'space-between',
    marginHorizontal: 16
  }
});
