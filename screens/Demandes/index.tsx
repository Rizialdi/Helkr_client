import React, { useEffect } from 'react';
import {
  Layout,
  Block,
  Text,
  DemandesLoadingIndicator,
  Button,
  StackedToBottom
} from '../sharedComponents';
import { FlatList, View, StyleSheet } from 'react-native';
import { makePseudoName, sortDemandes } from '../../utils';
import { theme } from '../../constants';
import Item from './components/Item';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EmptyQueryBox } from '../../assets/icons';

import { MenuProvider } from 'react-native-popup-menu';

import { useStoreState } from '../../models/index';
import {
  useDemandesrecuesQuery,
  useNewDemandeSubscription,
  DemandesrecuesDocument,
  DemandesrecuesQuery,
  NewDemandeSubscription
} from '../../graphql';
import {
  StackNavigationInterface,
  DemandesParamsList
} from '../../navigation/Routes';
import { cache } from '../../ApolloClient';

const Demandes = ({
  navigation
}: StackNavigationInterface<DemandesParamsList, 'Demandes'>) => {
  const { data, loading, called, client, refetch } = useDemandesrecuesQuery({
    fetchPolicy: 'cache-and-network'
  });

  const {
    user: { id: userId }
  } = useStoreState(state => state.User);

  const { data: dataNewDemande } = useNewDemandeSubscription({
    fetchPolicy: 'network-only',
    variables: { recipientId: userId || '' }
  });

  useEffect(() => {
    dataNewDemande && _update(dataNewDemande);

    dataNewDemande && demandes?.demandesrecues.length
      ? setDemandes({
          ...demandes,
          demandesrecues: [
            ...demandes?.demandesrecues,
            dataNewDemande.newDemande
          ]
        })
      : dataNewDemande &&
        !demandes?.demandesrecues.length &&
        setDemandes({
          ...demandes,
          demandesrecues: [dataNewDemande.newDemande]
        });
  }, [dataNewDemande]);

  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [demandes, setDemandes] = React.useState<typeof data | null>(null);

  const onRefresh = React.useCallback(() => {
    !refreshing && setRefreshing(true);
    client.reFetchObservableQueries().then(() => setRefreshing(false));
  }, [refreshing, client]);

  React.useEffect(() => {
    setDemandes(data);
  }, [data]);

  const _update = async (newDemande: NewDemandeSubscription): Promise<void> => {
    const cachedDemandes = cache.readQuery({
      query: DemandesrecuesDocument
    }) as DemandesrecuesQuery | undefined;

    const newCachedDemandes = cachedDemandes?.demandesrecues.length
      ? [...cachedDemandes.demandesrecues, newDemande.newDemande]
      : [newDemande.newDemande];

    cache.writeQuery({
      query: DemandesrecuesDocument,
      data: { ...cachedDemandes, demandesrecues: newCachedDemandes }
    });
  };

  return (
    <Layout title="Demandes">
      <View style={{ flex: 1 }}>
        {loading && !demandes?.demandesrecues.length ? (
          <DemandesLoadingIndicator />
        ) : called && !!demandes?.demandesrecues.length ? (
          <View
            style={{
              flex: 1
            }}>
            <MenuProvider style={styles.container}>
              <FlatList
                data={demandes ? sortDemandes(demandes?.demandesrecues) : []}
                refreshing={refreshing}
                onRefresh={onRefresh}
                style={{
                  height: (theme.sizes.screenHeight * 4) / 5
                }}
                pagingEnabled={true}
                alwaysBounceVertical={true}
                keyExtractor={item =>
                  `${item.createdAt} - ${item.sentBy?.prenom}`
                }
                renderItem={({ item }) => (
                  <Item
                    name={makePseudoName(
                      item.sentBy?.nom as string,
                      item.sentBy?.prenom as string
                    )}
                    messageText={item?.message}
                    messageDate={item.createdAt}
                    image={item?.sentBy?.avatar}
                    item={item}
                    navigation={navigation}
                  />
                )}
              />
            </MenuProvider>
          </View>
        ) : (
          <Block flex={false}>
            <Text
              horizontal={theme.sizes.twiceTen * 1.75}
              vertical={[theme.sizes.htwiceTen / 2, theme.sizes.htwiceTen]}
              numberOfLines={2}>
              N'hésitez pas à partager votre profil pour augmenter vos missions
              et booster vos revenus.
            </Text>
            <Block
              flex={false}
              center
              padding={[theme.sizes.screenHeight / 8, 0]}>
              <EmptyQueryBox />

              <StackedToBottom>
                <View style={{ paddingHorizontal: theme.sizes.hinouting }}>
                  <TouchableOpacity
                    onPress={() => (refetch ? refetch() : null)}>
                    <Button secondary>
                      <Text center bold>
                        Actualiser
                      </Text>
                    </Button>
                  </TouchableOpacity>
                </View>
              </StackedToBottom>
            </Block>
          </Block>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Demandes;
