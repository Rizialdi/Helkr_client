import React, { useEffect } from 'react';
import {
  Layout,
  Block,
  Text,
  DemandesLoadingIndicator,
  Button,
  StackedToBottom
} from '../sharedComponents';
import { FlatList, View } from 'react-native';
import { makePseudoName, sortDemandes } from '../../utils';
import { theme } from '../../constants';
import Item from './components/Item';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EmptyQueryBox } from '../../assets/icons';
import { useStoreState } from '../../models/index';
import {
  useDemandesrecuesQuery,
  useNewDemandeSubscription
} from '../../graphql';
import {
  StackNavigationInterface,
  DemandesParamsList
} from '../../navigation/Routes';

const Demandes = ({
  navigation
}: StackNavigationInterface<DemandesParamsList, 'Demandes'>) => {
  const { data, loading, called, client, refetch } = useDemandesrecuesQuery({
    fetchPolicy: 'cache-and-network'
  });

  const {
    user: { id: userId }
  } = useStoreState(state => state.User);

  const {
    loading: loadingNewDemande,
    data: dataNewDemande
  } = useNewDemandeSubscription({
    fetchPolicy: 'network-only',
    variables: { recipientId: userId || '' }
  });

  useEffect(() => {
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

  return (
    <Layout title={'Demandes'}>
      <Block flex={false} margin={[theme.sizes.inouting / 2, 0]}>
        {(loading || loadingNewDemande) && !demandes?.demandesrecues.length ? (
          <DemandesLoadingIndicator />
        ) : called && !!demandes?.demandesrecues.length ? (
          <FlatList
            data={sortDemandes(demandes?.demandesrecues)}
            refreshing={refreshing}
            onRefresh={onRefresh}
            style={{
              height: (theme.sizes.screenHeight * 4) / 5
            }}
            pagingEnabled={true}
            alwaysBounceVertical={true}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('QueryDetails', { item: item })
                  }>
                  <Item
                    name={makePseudoName(
                      item.sentBy?.nom as string,
                      item.sentBy?.prenom as string
                    )}
                    messageText={item?.message}
                    messageDate={item.createdAt}
                    image={item?.sentBy?.avatar}
                  />
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => `${item.createdAt} - ${item.sentBy?.prenom}`}
          />
        ) : (
          <Block flex={false}>
            <Text
              horizontal={theme.sizes.twiceTen * 1.75}
              vertical={[theme.sizes.htwiceTen, theme.sizes.htwiceTen]}
              numberOfLines={1}>
              Vous n'avez aucune demande actuellement.
            </Text>
            <Block
              flex={false}
              center
              padding={[theme.sizes.screenHeight / 7, 0]}>
              <EmptyQueryBox />

              <StackedToBottom>
                <View style={{ paddingHorizontal: theme.sizes.hinouting }}>
                  <TouchableOpacity onPress={() => refetch()}>
                    <Button secondary>
                      <Text center bold>
                        Refraichir
                      </Text>
                    </Button>
                  </TouchableOpacity>
                </View>
              </StackedToBottom>
            </Block>
          </Block>
        )}
      </Block>
    </Layout>
  );
};

export default Demandes;
