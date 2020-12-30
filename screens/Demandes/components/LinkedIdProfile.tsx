import { ApolloError } from 'apollo-client';
import { openURL } from 'expo-linking';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

import { theme } from '../../../constants';
import { UserByIdQuery, useUserByIdQuery } from '../../../graphql';
import {
  DemandesParamsList,
  StackNavigationInterface
} from '../../../navigation/Routes';
import { makePseudoName } from '../../../utils';
import { Description, ProfilContainer, Tag } from '../../Profile/components';
import {
  Block,
  Button,
  Layout,
  StatsContainer,
  Text
} from '../../sharedComponents';

const LinkedIdProfile = ({
  navigation,
  route: { params }
}: StackNavigationInterface<DemandesParamsList, 'LinkedIdProfile'>) => {
  let id = params && params.id ? params.id : '';

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApolloError>();
  const [data, setData] = useState<UserByIdQuery | null>(null);

  const { data: Data, loading: Loading, error: Error } = useUserByIdQuery({
    variables: { id },
    errorPolicy: 'ignore',
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    let isMounted = true;

    if (id && isMounted && Error) setError(error);
    if (id && isMounted && Loading) setLoading(loading);
    if (id && isMounted && Data && !Error) setData(Data);

    return () => {
      isMounted = false;
      navigation.setParams({ id: '' });
      return;
    };
  }, [Data, Loading, Error]);

  const {
    nom,
    tags,
    prenom,
    numero,
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
          numero: '',
          address: '_',
          description: '_',
          verified: false,
          professional: false
        };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        alignContent: 'center'
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: 'white ' }}>
        <Layout
          title={'Profil'}
          iconName={'close'}
          callBack={navigation.goBack}
          callBackParams={[]}>
          <>
            {loading || error ? (
              <View
                style={{
                  zIndex: 99,
                  position: 'absolute',
                  top: theme.sizes.screenHeight / 2,
                  marginHorizontal: theme.sizes.screenWidth / 2
                }}>
                <ActivityIndicator size="large" color="black" />
              </View>
            ) : data && data.userById ? (
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
                <View style={styles.delimiter}></View>
                <Block
                  margin={[
                    theme.sizes.twiceTen * 0.6,
                    theme.sizes.twiceTen * 1
                  ]}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}>
                    <Button
                      secondary
                      style={{ width: theme.sizes.screenWidth / 2.3 }}
                      onPress={() =>
                        navigation.navigate('CreateDemande', { id })
                      }>
                      <Text center bold numberOfLines={1} ellipsizeMode="tail">
                        Faire une demande
                      </Text>
                    </Button>
                    <Button
                      secondary
                      style={{ width: theme.sizes.screenWidth / 2.3 }}
                      onPress={() => openURL(`tel:${numero}`)}>
                      <Text center bold>
                        Appeler
                      </Text>
                    </Button>
                  </View>
                </Block>
              </ScrollView>
            ) : (
              <Text center>
                Une erreur s'est produite sur le réseau. Veuillez réessayer plus
                tard.
              </Text>
            )}
          </>
        </Layout>
      </ScrollView>
    </View>
  );
};

export default LinkedIdProfile;

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
