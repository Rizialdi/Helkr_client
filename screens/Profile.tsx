import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { theme, mocks } from '../constants';

interface Profile {
  image;
  username;
  address;
  count;
  tags;
}
export default function Profile() {
  const [profile, setProfile] = useState<Profile>();
  useEffect(() => setProfile(mocks.profile));
  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 40,
          marginBottom: 20,
          marginHorizontal: theme.sizes.base * 2
        }}
      >
        <Text style={{ fontFamily: 'josefinBold', fontSize: 25 }}>Profil</Text>
      </View>
      <View style={styles.header}>
        <View style={{ flex: 0.3, alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              overflow: 'hidden',
              margin: 'auto'
            }}
          >
            <Image
              source={profile.image}
              resizeMode="cover"
              style={{ width: '100%', height: '100%' }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.75, alignSelf: 'flex-start', paddingLeft: 10 }}>
          <Text style={styles.username}>{profile.username}</Text>
          <Text style={styles.address}>{profile.address}</Text>
          <Text style={styles.count}>({profile.count} commentaires)</Text>
          <Text style={styles.tags}>{profile.tags}</Text>
        </View>
      </View>
      <View style={{ flex: 0.7, paddingLeft: 20 }}>
        <Text>A completer</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  header: {
    flexDirection: 'row',
    flex: 0.25,
    marginHorizontal: 20
  },
  username: {
    fontFamily: 'josefinBold',
    fontSize: 20
  },
  address: {
    fontFamily: 'josefinRegular',
    fontSize: 16
  },
  count: {
    fontFamily: 'josefinLight',
    fontSize: 14
  },
  tags: {
    fontFamily: 'josefinRegular',
    fontSize: 14
  }
});
