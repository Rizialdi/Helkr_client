import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { theme, mocks } from '../constants';
import Icon from 'react-native-vector-icons/Octicons';

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

export default function Profile({ navigation }) {
  const [profile, setProfile] = useState<Profile>(mocks.profile);
  useEffect(() => setProfile(mocks.profile));
  const id = profile.id;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.titleBar}
          onPress={() => navigation.navigate('Reglages', { profile })}
        >
          <Icon name="kebab-vertical" size={24} color="#52575D" />
        </TouchableOpacity>

        <View style={{ alignSelf: 'center' }}>
          <TouchableOpacity style={styles.profileImage}>
            <Image
              source={profile.image}
              style={styles.image}
              resizeMode="cover"
            ></Image>
          </TouchableOpacity>
          <View style={styles.dm}>
            <Icon name="verified" size={18} color="#DFD8C8" />
          </View>
          <View style={styles.verified}>
            <Icon name="briefcase" size={30} color="#DFD8C8" />
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: '200', fontSize: 36 }]}>
            {profile.username}
          </Text>
          <Text style={[styles.text, { color: '#AEB5BC', fontSize: 14 }]}>
            {profile.address}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>483</Text>
            <Text style={[styles.text, styles.subText]}>Accomplies</Text>
          </View>
          <View
            style={[
              styles.statsBox,
              {
                borderColor: '#DFD8C8',
                borderLeftWidth: 1,
                borderRightWidth: 1
              }
            ]}
          >
            <Text style={[styles.text, { fontSize: 24 }]}>45,844</Text>
            <Text style={[styles.text, styles.subText]}>Proposées</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>3.5/5</Text>
            <Text style={[styles.text, styles.subText]}>Moyenne</Text>
          </View>
        </View>
        <View style={styles.delimiter}></View>
        <View style={[styles.description]}>
          <Text
            style={[
              styles.text,
              { fontWeight: '300', fontSize: 24, paddingLeft: 20 }
            ]}
          >
            Description
          </Text>
          <Text style={[styles.text, styles.subText2]}>
            {profile.description}
          </Text>
        </View>
        <View style={styles.delimiter}></View>
        <TouchableOpacity
          style={styles.lineStars}
          onPress={() => navigation.navigate('Avis', { id })}
        >
          <View style={{ flexDirection: 'row' }}>
            <Icon name="star" size={25} color="#52575D" />
            <Text
              style={[
                styles.text,
                { paddingLeft: 20, fontSize: theme.sizes.base * 1.2 }
              ]}
            >
              3.5/5
            </Text>
          </View>
          <Icon name="chevron-right" size={24} color="#52575D" />
        </TouchableOpacity>
        <View style={styles.delimiter}></View>
        <View style={[styles.description]}>
          <Text
            style={[
              styles.text,
              { fontWeight: '300', fontSize: 24, paddingLeft: 20 }
            ]}
          >
            Tags
          </Text>
          <Text style={[styles.text, styles.subText2]}>{profile.tags}</Text>
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
  image: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
    marginHorizontal: 16
  },
  subText: {
    fontSize: 12,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500'
  },
  subText2: {
    fontSize: theme.sizes.body,
    color: '#AEB5BC',
    fontWeight: '500',
    textAlign: 'justify',
    paddingHorizontal: 20,
    marginTop: 10
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 100,
    overflow: 'hidden'
  },
  dm: {
    backgroundColor: '#41444B',
    position: 'absolute',
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  verified: {
    backgroundColor: 'green',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 32
  },
  statsBox: {
    alignItems: 'center',
    flex: 1
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 10
  },
  mediaCount: {
    backgroundColor: '#41444B',
    position: 'absolute',
    top: '50%',
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.38)',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16
  },
  activityIndicator: {
    backgroundColor: '#CABFAB',
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20
  },
  description: {
    marginTop: 10
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
