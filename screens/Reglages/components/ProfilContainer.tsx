import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

import { Text } from '../../shareComponents';

export default ({
  image,
  username,
  address,
  verified = false,
  pro = false,
  parentCallback,
  parentAddressCallback
}) => {
  const [imagePicked, setImagePicked] = useState(null);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    onChange(address);
  }, [address]);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert(
          'Désolé; nous avons besoin de la permission pour effectuer cette action'
        );
      }
    }
  };

  const onChange = (text) => {
    setText(text);
    parentAddressCallback(text);
  };

  const pickImage = async () => {
    getPermissionAsync();

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64: true
      });
      if (!result.cancelled) {
        //@ts-ignore
        setImagePicked(result);
        //@ts-ignore
        parentCallback(result);
      }
    } catch (E) {
      throw new Error('Image Invalid');
    }
  };

  return (
    <>
      <View style={{ alignSelf: 'center' }}>
        <TouchableOpacity
          style={styles.profileImage}
          onPress={() => pickImage()}
        >
          <Image
            source={
              imagePicked && imagePicked.uri ? { uri: imagePicked.uri } : image
            }
            style={styles.image}
            resizeMode="cover"
          />
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

        <TextInput
          style={[
            styles.text,
            { color: '#AEB5BC', fontSize: 14, width: '100%' }
          ]}
          maxLength={30}
          placeholder={text ? text : 'Ajouter une addresse.'}
          value={text ? text : ''}
          onChangeText={(text) => onChange(text)}
        />
      </View>
    </>
  );
};

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
