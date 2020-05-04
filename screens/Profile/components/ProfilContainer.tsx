import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

export default ({
  image,
  username,
  address,
  verified = false,
  pro = false
}) => (
  <>
    <View style={{ alignSelf: 'center' }}>
      <TouchableOpacity style={styles.profileImage}>
        <Image source={image} style={styles.image} resizeMode="cover"></Image>
      </TouchableOpacity>
      {verified && (
        <View style={styles.dm}>
          <Icon name="verified" size={18} color="#DFD8DF" />
        </View>
      )}
      {pro && (
        <View style={styles.verified}>
          <Icon name="briefcase" size={30} color="#DFD8C8" />
        </View>
      )}
    </View>
    <View style={styles.infoContainer}>
      <Text style={[styles.text, { fontWeight: '200', fontSize: 36 }]}>
        {username}
      </Text>
      <Text style={[styles.text, { color: '#AEB5BC', fontSize: 14 }]}>
        {address || '_'}
      </Text>
    </View>
  </>
);

const styles = StyleSheet.create({
  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16
  },
  text: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D'
  },

  dm: {
    backgroundColor: 'green',
    position: 'absolute',
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%'
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
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 100,
    overflow: 'hidden'
  }
});
