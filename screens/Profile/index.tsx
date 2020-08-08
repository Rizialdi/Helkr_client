import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

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
import { useStoreState } from '../../models';

type Props = StackNavigationInterface<MainStackParamList, 'Profile'>;

export default function Profile({ navigation, route: { params } }: Props) {
  const { user } = useStoreState(state => state.User);
  const id = params && params?.id ? params.id : user.id ? user.id : '';

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
    fetchPolicy: 'cache-and-network'
  });

  return (
    <Layout
      title={params && params.id ? 'Explorer' : 'Profil'}
      iconName={params && params.id ? 'close' : 'setting'}
      callBack={params && params.id ? navigation.goBack : navigation.navigate}
      callBackParams={params && params.id ? [] : ['Reglages']}>
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
            {tags && tags?.length > 0 ? (
              <Tag tags={tags} />
            ) : (
              <Text horizontal={25} gray>
                _
              </Text>
            )}
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
