import React, { useEffect, useMemo, useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import {
  AsyncStorage,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { ImagePicker } from 'expo';
import { ReactNativeFile } from 'apollo-upload-client';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '../../constants';
import { Text } from '../sharedComponents';
import { Description, ProfilContainer, Tag } from './components';
import { useStoreActions } from '../../models';
import { getFileName } from '../../utils';
import {
  useAddressUpdateMutation,
  useAvatarUploadMutation,
  useDescriptionUpdateMutation,
  useTagsUpdateMutation,
  useUserByIdQuery
} from '../../graphql';
import {
  StackNavigationInterface,
  MainStackParamList
} from '../../navigation/Routes';

export default function Profile({
  navigation
}: StackNavigationInterface<MainStackParamList, 'Reglages'>) {
  const [Id, setId] = useState<string>('');
  const apolloClient = useApolloClient();
  const [disableSaveButton, setDisableSaveButton] = useState<boolean>(false);
  const [image, setImage] = useState<ImagePicker.ImagePickerResult>(null);
  const [addressParent, setAddressParent] = useState<string>('');
  const [descriptionParent, setDescriptionParent] = useState<string>('');
  // TODO solve not setTags allowed
  const [tagList, SetTags] = useState<Array<string>>([]);
  const [uploadFileMutation] = useAvatarUploadMutation();
  const [descriptionMutation] = useDescriptionUpdateMutation();
  const [addressMutation] = useAddressUpdateMutation();
  const [tagsMutation] = useTagsUpdateMutation();
  const { setTags } = useStoreActions(actions => actions.Offering);

  useMemo(() => {
    (async () => {
      try {
        const id = await AsyncStorage.getItem('id');
        id && setId(id);
      } catch (error) {
        throw new Error('Unable to load Credentials');
      }
    })();
  }, []);
  const id = Id;
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
        tags: [],
        avatar: null,
        address: '',
        description: '_',
        verified: false,
        professional: false
      }
    } = {}
  } = useUserByIdQuery({
    variables: { id },
    errorPolicy: 'ignore',
    fetchPolicy: 'cache-and-network'
  });
  const type = image ? `image/${String(image?.uri).split('.')[1]}` : '';

  let pictureUrl: ReactNativeFile | null =
    image && image?.base64
      ? new ReactNativeFile({
          uri: `data:${type};base64,${image?.base64}`,
          type,
          name: getFileName(image?.uri)
        })
      : null;

  const [isModified, setIsModified] = useState<boolean>(false);

  // TODO check working of this function
  useEffect(() => {
    setIsModified(
      !(address?.toLowerCase() === addressParent?.toLowerCase()) ||
        !(description?.toLowerCase() === descriptionParent?.toLowerCase()) ||
        !(JSON.stringify(tagList?.sort()) === JSON.stringify(tags?.sort())) ||
        !!image
    );
  }, [image, addressParent, descriptionParent, tagList]);

  const save = () => {
    try {
      setDisableSaveButton(true);
      pictureUrl && onChangeImage(pictureUrl);
      descriptionParent && onChangeDescription(descriptionParent);
      addressParent && onChangeAddress(addressParent);
      tagList && onChangeTags(tagList);

      setTimeout(() => {
        navigation.navigate('Profile');
      }, 500);
    } catch (error) {
      throw new Error(error);
    }
  };

  const onChangeImage = (file: any) => {
    uploadFileMutation({ variables: { file } })
      .then(() => {
        apolloClient.reFetchObservableQueries();
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  const onChangeDescription = (text: string) => {
    try {
      descriptionMutation({ variables: { text } }).then(() => {
        apolloClient.reFetchObservableQueries();
      });
    } catch (error) {
      throw new Error('Mutation failed');
    }
  };

  const onChangeAddress = (text: string) => {
    try {
      addressMutation({ variables: { text } }).then(() => {
        apolloClient.reFetchObservableQueries();
      });
    } catch (error) {
      throw new Error('Mutation failed');
    }
  };

  const storeTags = async (array: string[]) => {
    setTags(array);
    (async () => {
      try {
        await AsyncStorage.setItem('tags', JSON.stringify(array));
      } catch (error) {
        throw new Error('tags storage failed');
      }
    })();
  };

  const onChangeTags = (array: string[]) => {
    try {
      tagsMutation({ variables: { tags: array } })
        .then(() => apolloClient.reFetchObservableQueries())
        .then(() => storeTags(array));
    } catch (error) {
      throw new Error('tags storage failed');
    }
  };
  const color =
    isModified && !disableSaveButton ? theme.colors.primary : theme.colors.gray;
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView enabled={true} behavior="position">
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.titleBar}
            disabled={disableSaveButton}
            onPress={() => isModified && save()}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: color
              }}>
              Sauvegarder
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <ProfilContainer
              image={image ? image : avatar ? avatar : ''}
              username={
                prenom.replace(/^./, prenom[0].toUpperCase()) +
                ' ' +
                nom.charAt(0) +
                '.'
              }
              address={address}
              verified={verified}
              pro={professional}
              parentAddressCallback={setAddressParent}
              parentCallback={setImage}
            />
          </TouchableOpacity>
          <View style={styles.delimiter}></View>
          <Description
            description={description}
            parentCallback={setDescriptionParent}
          />
          <View style={styles.delimiter}></View>
          <View>
            <Text
              style={[
                styles.text,
                {
                  fontWeight: '300',
                  fontSize: 24,
                  paddingLeft: 20,
                  paddingTop: 10
                }
              ]}>
              Tags
            </Text>
            <Tag tags={tags} parentCallback={SetTags} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
