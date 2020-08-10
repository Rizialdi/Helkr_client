import React from 'react';
import { Octicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { theme } from '../../../constants';
import { Text, ImageComponent } from '../../sharedComponents';

interface Props {
  image?: string | null;
  username: string;
  address?: string | null;
  verified?: boolean;
  pro?: boolean;
}

export default ({
  image,
  username,
  address,
  verified = false,
  pro = false
}: Props) => (
  <>
    <View style={{ alignSelf: 'center' }}>
      <TouchableOpacity style={styles.profileImage}>
        <ImageComponent {...{ image }} style={styles.image} />
      </TouchableOpacity>
      {verified && (
        <View style={styles.dm}>
          <Octicons
            name="verified"
            size={theme.sizes.twiceTen * 0.9}
            color="#DFD8DF"
          />
        </View>
      )}
      {pro && (
        <View style={styles.verified}>
          <Octicons
            name="briefcase"
            size={theme.sizes.twiceTen * 1.5}
            color="#DFD8C8"
          />
        </View>
      )}
    </View>
    <View style={styles.infoContainer}>
      <Text style={[styles.text, { fontSize: theme.sizes.h3 * 2 }]}>
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
    marginTop: theme.sizes.hinouting * 0.64
  },
  text: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D'
  },

  dm: {
    backgroundColor: 'green',
    position: 'absolute',
    top: theme.sizes.hinouting * 0.8,
    width: theme.sizes.inouting * 2,
    height: theme.sizes.hinouting * 2,
    borderRadius: theme.sizes.radius * 50,
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
    width: theme.sizes.inouting * 2,
    height: theme.sizes.hinouting * 2,
    borderRadius: theme.sizes.radius * 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileImage: {
    width: theme.sizes.inouting * 7.2,
    height: theme.sizes.hinouting * 7.2,
    borderRadius: theme.sizes.radius * 50,
    overflow: 'hidden'
  }
});
