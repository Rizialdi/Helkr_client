import React from 'react';
import { Octicons, AntDesign } from '@expo/vector-icons';
import { useStoreState } from '../../../models';
import { StyleSheet, TouchableOpacity, View, Share, Alert } from 'react-native';
import { makeUrl } from 'expo-linking';
import { theme } from '../../../constants';
import { Text, ImageComponent } from '../../sharedComponents';

interface Props {
  image?: string | null;
  username: string;
  address?: string | null;
  verified?: boolean;
  pro?: boolean;
  selfUserId?: string;
}

export default ({
  image,
  username,
  address,
  verified = false,
  pro = false,
  selfUserId
}: Props) => {
  const { themeColors } = useStoreState(state => state.Preferences);

  const shareProfile = async () => {
    try {
      await Share.share({
        message: `Venez visiter mon profil sur Helkr. N'hesitez pas à me faire une demande de services.\n${makeUrl(
          `profile/${selfUserId}`
        )}`,
        title: 'Partage de profil.'
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <>
      <View style={{ alignSelf: 'center' }}>
        <TouchableOpacity style={styles.profileImage}>
          <ImageComponent {...{ image }} style={styles.image} />
        </TouchableOpacity>
        {verified && (
          <View
            style={[
              styles.verified,
              { backgroundColor: themeColors.secondary }
            ]}>
            <Octicons
              name="verified"
              size={theme.sizes.twiceTen * 0.9}
              color={themeColors.background}
            />
          </View>
        )}
        {pro && (
          <View
            style={[
              styles.briefcase,
              { backgroundColor: themeColors.secondary }
            ]}>
            <Octicons
              name="briefcase"
              size={theme.sizes.twiceTen * 1.5}
              color={themeColors.background}
            />
          </View>
        )}
        {!!selfUserId && (
          <TouchableOpacity style={styles.share} onPress={shareProfile}>
            <AntDesign name="upload" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.text, { fontSize: theme.sizes.h3 * 2 }]}>
          {username}
        </Text>
        <Text style={[styles.text, { color: '#AEB5BC', fontSize: 14 }]}>
          {`${address?.charAt(0).toUpperCase()}${address?.slice(1)}` || '_'}
        </Text>
      </View>
    </>
  );
};

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

  verified: {
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
  briefcase: {
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
  },
  share: {
    position: 'absolute',
    bottom: theme.sizes.twiceTen * 3.5,
    right: -theme.sizes.htwiceTen * 4.2
  }
});
