import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { ReactNativeFile } from 'apollo-upload-client';
import { useApolloClient, useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { theme } from '../../constants';
import { Tag, Description, ProfilContainer } from './components';

const INFO = gql`
  query userById($id: String!) {
    userById(id: $id) {
      nom
      prenom
      avatar
      address
      verified
      description
      professional
    }
  }
`;

const SINGLE_UPLOAD_MUTATION = gql`
  mutation avatarUpload($file: Upload!) {
    avatarUpload(file: $file)
  }
`;

const DESCRIPTION_MUTATION = gql`
  mutation descriptionUpdate($text: String!) {
    descriptionUpdate(text: $text)
  }
`;

const ADDRESS_MUTATION = gql`
  mutation addressUpdate($text: String!) {
    addressUpdate(text: $text)
  }
`;
export default function Profile({ navigation, route: { params } }) {
  const [Id, setId] = useState('');
  const [image, setImage] = useState(null);
  const [descriptionParent, setDescriptionParent] = useState(null);
  const [addressParent, setAddressParent] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const id = await AsyncStorage.getItem('id');
        setId(id);
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
        tags: ['_'],
        avatar: null,
        address: '',
        description: '_',
        verified: false,
        professional: false
      }
    } = {}
  } = useQuery(INFO, {
    variables: { id },
    errorPolicy: 'ignore',
    fetchPolicy: 'cache-and-network',
    pollInterval: 1000
  });

  const apolloClient = useApolloClient();
  const [uploadFileMutation] = useMutation(SINGLE_UPLOAD_MUTATION);
  const [descriptionMutation] = useMutation(DESCRIPTION_MUTATION);
  const [addressMutation] = useMutation(ADDRESS_MUTATION);

  const getName = (chaine) =>
    String(chaine).split('/')[String(chaine).split('/').length - 1];

  const type = image ? `image/${String(image.uri).split('.')[1]}` : '';

  let pictureUrl =
    image && image.base64
      ? new ReactNativeFile({
          uri: `data:${type};base64,${image.base64}`,
          type,
          name: getName(image.uri)
        })
      : null;

  const save = () => {
    try {
      pictureUrl ? onChangeImage(pictureUrl) : null;
      descriptionParent ? onChangeDescription(descriptionParent) : null;
      addressParent ? onChangeAddress(addressParent) : null;
    } catch (error) {
      throw new Error(error);
    }
  };

  const onChangeImage = (file) => {
    uploadFileMutation({ variables: { file } })
      .then(() => {
        apolloClient.resetStore();
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const onChangeDescription = (text) => {
    descriptionMutation({ variables: { text } })
      .then(() => {
        apolloClient.resetStore();
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const onChangeAddress = (text) => {
    addressMutation({ variables: { text } })
      .then(() => {
        apolloClient.resetStore();
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView enabled={true} behavior="position">
        <ScrollView showsVerticalScrollIndicator={false}>
          {(!params || !params.id) && (
            <TouchableOpacity style={styles.titleBar} onPress={() => save()}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: theme.colors.primary
                }}
              >
                Sauvegarder
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity>
            <ProfilContainer
              image={
                image
                  ? { uri: image }
                  : avatar
                  ? { uri: avatar }
                  : require('../../assets/images/default-user-image.png')
              }
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
                  paddingBottom: 10
                }
              ]}
            >
              Tags
            </Text>
            <Tag tags={tags} />
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
