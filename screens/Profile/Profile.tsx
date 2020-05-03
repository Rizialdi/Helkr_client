import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import {
  Tag,
  Description,
  AvgContainer,
  StatsContainer,
  ProfilContainer
} from './components';
import { mocks } from '../../constants';
import Icon from 'react-native-vector-icons/Octicons';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

interface Profile {
  username: string;
  address: string;
  stars: number;
  count: number;
  image: any;
  tags: string[];
  description: string;
  avis: { name: string; tag: string; stars: number; evaluation: string }[];
  id: string;
}

const STATS = gql`
  query getUserStats($id: String!) {
    getUserStats(id: $id) {
      done
      proposed
      average
    }
  }
`;

export default function Profile({ navigation }) {
  const [profile, setProfile] = useState<Profile>(mocks.profile);
  const [id, setId] = useState('');

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

  const {
    data: { getUserStats = { done: 0, proposed: 0, average: 0 } } = {}
  } = useQuery(STATS, {
    variables: { id }
  });

  useEffect(() => setProfile(mocks.profile));
  console.log('id', getUserStats);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.titleBar}
          onPress={() => navigation.navigate('Reglages')}
        >
          <Icon name="gear" size={24} color="#52575D" />
        </TouchableOpacity>

        <ProfilContainer
          image={profile.image}
          username={profile.username}
          address={profile.address}
        />
        <StatsContainer
          done={getUserStats.done}
          proposed={getUserStats.proposed}
          average={getUserStats.average}
        />
        <View style={styles.delimiter}></View>
        <Description description={profile.description} />
        <View style={styles.delimiter}></View>
        <TouchableOpacity
          style={styles.lineStars}
          onPress={() => navigation.navigate('Avis')}
        >
          <AvgContainer average={4} done={8} />
          <Icon name="chevron-right" size={24} color="#52575D" />
        </TouchableOpacity>
        <View style={styles.delimiter}></View>
        <View>
          <Text
            style={[
              styles.text,
              { fontWeight: '300', fontSize: 24, paddingLeft: 20 }
            ]}
          >
            Tags
          </Text>
          <Tag tags={profile.tags} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
