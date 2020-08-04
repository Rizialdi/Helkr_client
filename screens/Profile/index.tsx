import Icon from 'react-native-vector-icons/Octicons';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

import { makePseudoName } from '../../utils';
import { Text, Layout } from '../sharedComponents';
import {
  Description,
  ProfilContainer,
  StatsContainer,
  Tag
} from './components';
import { useUserByIdQuery } from '../../graphql';
import {
  StackNavigationInterface,
  MainStackParamList
} from '../../navigation/Routes';

type Props = StackNavigationInterface<MainStackParamList, 'Profile'>;

export default function Profile({ navigation, route: { params } }: Props) {
  const [Id, setId] = useState<string | null>('');

  useMemo(() => {
    (async () => {
      try {
        const id: string | null = await AsyncStorage.getItem('id');
        setId(id);
      } catch (error) {
        throw new Error('Unable to load Credentials');
      }
    })();
  }, []);

  const id = params && params?.id ? params.id : Id ? Id : '';

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
        address: '_',
        description: '_',
        verified: false,
        professional: false
      }
    } = {},
    loading
  } = useUserByIdQuery({
    variables: { id },
    errorPolicy: 'ignore',
    fetchPolicy: 'cache-and-network',
    pollInterval: 100 * 3600 * 24
  });

  return (
    <Layout title={'Profil'}>
      <>
        {loading && (
          <View
            style={{
              zIndex: 99,
              position: 'absolute',
              top: '50%',
              marginHorizontal: '50%'
            }}>
            <ActivityIndicator size="large" color="black" />
          </View>
        )}
        <ScrollView showsVerticalScrollIndicator={true}>
          {params && params.id ? null : (
            <TouchableOpacity
              style={styles.titleBar}
              onPress={() => navigation.navigate('Reglages')}>
              <Icon name="gear" size={24} color="#52575D" />
            </TouchableOpacity>
          )}
          <ProfilContainer
            image={avatar}
            username={makePseudoName(nom, prenom)}
            address={address}
            verified={verified}
            pro={professional}
          />
          <StatsContainer id={id} navigation={navigation} />
          <View style={styles.delimiter}></View>
          <Description description={description} />
          <View style={styles.delimiter}></View>
          <View>
            <Text
              style={[
                styles.text,
                {
                  fontWeight: '300',
                  fontSize: 24,
                  paddingLeft: 20
                }
              ]}>
              Tags
            </Text>
            {tags && tags?.length > 0 && <Tag tags={tags} />}
          </View>
        </ScrollView>
      </>
    </Layout>
  );
}

const styles = StyleSheet.create({
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
  }
});
