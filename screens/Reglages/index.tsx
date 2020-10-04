import React, { useEffect, useState } from 'react';
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
import { AntDesign } from '@expo/vector-icons';

import { theme } from '../../constants';
import { Text, Block } from '../sharedComponents';
import { Description, ProfilContainer, Tag } from './components';
import { useStoreActions, useStoreState } from '../../models';
import { getFileName } from '../../utils';
import Layout from '../sharedComponents/Layout';
import { ActivityIndicator } from 'react-native';
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
  const apolloClient = useApolloClient();
  const [disableSaveButton, setDisableSaveButton] = useState<boolean>(false);
  const [image, setImage] = useState<ImagePicker.ImagePickerResult>(null);
  const [addressParent, setAddressParent] = useState<string>('');
  const [descriptionParent, setDescriptionParent] = useState<string>('');
  // TODO solve not setTags allowed
  const [tagList, SetTags] = useState<string[]>([]);
  const [uploadFileMutation] = useAvatarUploadMutation();
  const [descriptionMutation] = useDescriptionUpdateMutation();
  const [addressMutation] = useAddressUpdateMutation();
  const [tagsMutation] = useTagsUpdateMutation();
  const { setTags } = useStoreActions(actions => actions.Offering);
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);

  const { user } = useStoreState(state => state.User);
  const { themeColors } = useStoreState(state => state.Preferences);

  const id = user && user.id ? user.id : '';

  const { data, loading } = useUserByIdQuery({
    variables: { id },
    errorPolicy: 'ignore',
    fetchPolicy: 'cache-and-network'
  });

  const {
    nom,
    tags,
    prenom,
    avatar,
    address,
    description,
    verified,
    professional
  } =
    data && data.userById
      ? data.userById
      : {
          nom: 'John',
          prenom: 'Doe',
          tags: ['_'],
          avatar: null,
          address: '_',
          description: '_',
          verified: false,
          professional: false
        };

  const type = image ? `image/${String(image?.uri).split('.')[1]}` : '';

  const pictureUrl: ReactNativeFile | null =
    image && image?.base64
      ? new ReactNativeFile({
          uri: `data:${type};base64,${image?.base64}`,
          type,
          name: getFileName(image?.uri)
        })
      : null;

  const [isModified, setIsModified] = useState<boolean>(false);

  useEffect(() => {
    tags && SetTags(tags);
  }, [tags]);

  useEffect(() => {
    setIsModified(
      !(address?.toLowerCase() === addressParent?.toLowerCase()) ||
        !(description?.toLowerCase() === descriptionParent?.toLowerCase()) ||
        !(JSON.stringify(tagList?.sort()) === JSON.stringify(tags?.sort())) ||
        !!image
    );
  }, [
    image,
    addressParent,
    descriptionParent,
    tagList,
    address,
    description,
    tags
  ]);

  const save = () => {
    try {
      setDisableSaveButton(true);
      pictureUrl && onChangeImage(pictureUrl);
      descriptionParent && onChangeDescription(descriptionParent);
      addressParent && onChangeAddress(addressParent);
      tagList && onChangeTags(tagList);

      setTimeout(() => {
        navigation.goBack();
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
    isModified && !disableSaveButton
      ? theme.colors.secondary
      : theme.colors.gray;
  return (
    <>
      {loading && <ActivityIndicator size={'small'} />}
      {data && data.userById && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            height: theme.sizes.screenHeight,
            backgroundColor: themeColors.background
          }}>
          <Layout>
            <>
              <Block flex={false} row space="between" margin={[14, 14, 25, 12]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <AntDesign name="left" color={'black'} size={24} />
                </TouchableOpacity>
                <Text
                  h2
                  medium
                  style={{ fontFamily: 'josefinBold', fontSize: 25 }}>
                  Réglages
                </Text>
                <TouchableOpacity
                  disabled={disableSaveButton || !netWorkStatus}
                  onPress={() => isModified && save()}>
                  <AntDesign name="save" color={color} size={24} />
                </TouchableOpacity>
              </Block>
              <KeyboardAvoidingView enabled={true} behavior="height">
                <ScrollView showsVerticalScrollIndicator={false}>
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
                      medium
                      style={[
                        styles.text,
                        {
                          paddingLeft: theme.sizes.twiceTen,
                          fontSize: theme.sizes.twiceTen * 1.2,
                          paddingTop: theme.sizes.hinouting * 0.4
                        }
                      ]}>
                      Tags
                    </Text>
                    <Tag tags={tags} parentCallback={SetTags} />
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </>
          </Layout>
        </ScrollView>
      )}
    </>
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
    marginTop: theme.sizes.hinouting * 0.96,
    marginHorizontal: theme.sizes.inouting * 0.64
  },
  delimiter: {
    borderTopColor: '#DFD8C8',
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: theme.sizes.hinouting
  },
  lineStars: {
    flexDirection: 'row',
    marginTop: theme.sizes.hinouting,
    justifyContent: 'space-between',
    marginHorizontal: theme.sizes.inouting * 0.64
  }
});
