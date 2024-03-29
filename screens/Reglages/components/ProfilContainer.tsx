import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

import { Octicons } from '@expo/vector-icons';

import { theme } from '../../../constants';
import { cities } from '../../../constants/mocks';
import { useStoreState } from '../../../models';
import { getPermissionAsync } from '../../../utils';
import { ImageComponent, Text } from '../../sharedComponents';

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

  const { themeColors } = useStoreState(state => state.Preferences);

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
          <View style={[styles.dm, { backgroundColor: themeColors.secondary }]}>
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
              styles.verified,
              { backgroundColor: themeColors.secondary }
            ]}>
            <Octicons
              name="briefcase"
              size={theme.sizes.twiceTen * 1.5}
              color={themeColors.background}
            />
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text
          style={[
            styles.text,
            { fontWeight: '200', fontSize: theme.sizes.twiceTen * 1.8 }
          ]}>
          {username}
        </Text>

        <ModalSelector
          data={cities}
          cancelTextStyle={{ fontWeight: 'bold' }}
          optionTextStyle={{
            color: theme.colors.black,
            fontSize: theme.fonts.body.fontSize,
            fontWeight: 'bold'
          }}
          optionStyle={{ padding: 20 }}
          optionContainerStyle={{ backgroundColor: '#fff' }}
          cancelText={'Fermer'}
          cancelStyle={{
            backgroundColor: theme.colors.secondary,
            padding: 15
          }}
          scrollViewAccessibilityLabel={'Scrollable options'}
          cancelButtonAccessibilityLabel={'Cancel Button'}
          onChange={option => onChange(option.label)}>
          <TextInput
            style={[
              styles.text,
              {
                color: '#AEB5BC',
                fontSize: theme.sizes.twiceTen * 0.7,
                width: '100%'
              }
            ]}
            maxLength={30}
            placeholder={text ? text : 'Ajouter une addresse.'}
            value={text ? text : ''}
          />
        </ModalSelector>
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
