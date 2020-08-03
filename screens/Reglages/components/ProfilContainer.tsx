import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Icon from 'react-native-vector-icons/Octicons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { getPermissionAsync } from '../../../utils';
import { Text, ImageComponent } from '../../sharedComponents';

interface Props {
  image: string;
  username: string;
  address?: string | null;
  verified?: boolean;
  pro?: boolean;
  parentCallback: (a: ImagePicker.ImagePickerResult) => void;
  parentAddressCallback: (a: string) => void;
}

export default ({
  image,
  username,
  address,
  verified = false,
  pro = false,
  parentCallback,
  parentAddressCallback
}: Props) => {
  const [
    imagePicked,
    setImagePicked
  ] = useState<ImagePicker.ImagePickerResult | null>(null);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    onChange(address || '');
  }, [address]);

  const onChange = (text: string) => {
    setText(text);
    parentAddressCallback(text);
  };

  const pickImage = async () => {
    if (await getPermissionAsync(Permissions.CAMERA_ROLL)) {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
          base64: true
        });
        if (!result.cancelled) {
          setImagePicked(result);
          parentCallback(result);
        }
      } catch (error) {
        throw new Error(`Invalid image ${error}`);
      }
    }
  };

  return (
    <>
      <View style={{ alignSelf: 'center' }}>
        <TouchableOpacity
          style={styles.profileImage}
          onPress={() => pickImage()}>
          <ImageComponent
            image={
              !imagePicked?.cancelled && imagePicked?.uri
                ? imagePicked.uri
                : image
            }
            style={styles.image}
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
          onChangeText={text => onChange(text)}
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
