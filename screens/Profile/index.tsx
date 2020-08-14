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
import { theme } from '../../constants';

type Props = StackNavigationInterface<MainStackParamList, 'Profile'>;

export default function Profile({ navigation, route: { params } }: Props) {
  const { user } = useStoreState(state => state.User);
  const id = params && params?.id ? params.id : user.id ? user.id : '';

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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
                top: theme.sizes.screenHeight / 2,
                marginHorizontal: theme.sizes.screenWidth / 2
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
                medium
                style={[
                  styles.text,
                  {
                    paddingLeft: theme.sizes.twiceTen,
                    fontSize: theme.sizes.twiceTen * 1.2
                  }
                ]}>
                Tags
              </Text>
              {tags && tags?.length > 0 ? (
                <Tag tags={tags} />
              ) : (
                <Text
                  horizontal={theme.sizes.twiceTen * 1.25}
                  vertical={[0, theme.sizes.hbase]}
                  gray>
                  _
                </Text>
              )}
            </View>
          </ScrollView>
        </>
      </Layout>
    </ScrollView>
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
    marginTop: theme.sizes.hinouting * 0.96,
    marginHorizontal: theme.sizes.inouting * 0.64
  },
  delimiter: {
    borderTopColor: '#DFD8C8',
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: theme.sizes.hinouting
  }
});
