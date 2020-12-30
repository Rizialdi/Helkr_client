import React, { SFC, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import {
  OfferingFragment,
  useIncompleteOfferingsQuery,
  useOnOfferingAddedSubscription
} from '../../../graphql';
import { useStoreState } from '../../../models';
import { MainStackParamList } from '../../../navigation/Routes';
import { CustomListView } from '../../sharedComponents';

interface Props {
  navigation: StackNavigationProp<MainStackParamList, 'DetailOffering'>;
}

const Offres: SFC<Props> = ({ navigation }) => {
  const take = 3;
  const [stateData, setStateData] = useState<OfferingFragment[]>();
  const [loadingTabOne, setLoadingTabOne] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [lastCursorId, setLastCursorId] = useState<string | undefined>();
  const [hasNext, setHasNext] = useState<boolean>(true);

  const { tags } = useStoreState(state => state.Offering);
  const { user } = useStoreState(state => state.User);

  const {
    data,
    loading,
    error,
    client,
    fetchMore
  } = useIncompleteOfferingsQuery({
    fetchPolicy: 'cache-and-network',
    variables: { take, filters: tags }
  });

  const onEndReached = () => {
    hasNext &&
      fetchMore({
        variables: { take, lastCursorId: lastCursorId ? lastCursorId : '' },
        updateQuery: (previousQueryResult, { fetchMoreResult }) => {
          if (fetchMoreResult) {
            const { endCursor, hasNext } = fetchMoreResult?.incompleteOfferings;
            setHasNext(hasNext);
            setLastCursorId(endCursor);
          }
          return {
            ...previousQueryResult,
            incompleteOfferings: {
              ...previousQueryResult.incompleteOfferings,
              ...fetchMoreResult?.incompleteOfferings,
              offerings: [
                ...(previousQueryResult.incompleteOfferings
                  .offerings as OfferingFragment[]),
                ...(fetchMoreResult?.incompleteOfferings
                  .offerings as OfferingFragment[])
              ]
            }
          };
        }
      });
  };

  const {
    data: dataNewOffering,
    error: errorNewOffering
  } = useOnOfferingAddedSubscription({
    variables: { tags },
    shouldResubscribe: true
  });

  const onRefresh = React.useCallback(() => {
    !refreshing && setRefreshing(true);
    client.reFetchObservableQueries().then(() => setRefreshing(false));
  }, [refreshing, client]);

  useEffect(() => {
    setLoadingTabOne(true);
    client.reFetchObservableQueries().then(() => setLoadingTabOne(false));
  }, [client, tags]);

  useEffect(() => {
    setLoadingTabOne(loading);
  }, [loading]);

  useEffect(() => {
    if (
      !error &&
      data &&
      data.incompleteOfferings &&
      data.incompleteOfferings.offerings
    ) {
      const { hasNext, endCursor, offerings } = data.incompleteOfferings;
      setHasNext(hasNext);
      setLastCursorId(endCursor);
      setStateData(offerings);
    }
  }, [data, error, loading]);

  useEffect(() => {
    if (
      dataNewOffering &&
      stateData &&
      dataNewOffering?.onOfferingAdded &&
      !errorNewOffering &&
      dataNewOffering.onOfferingAdded.author.id !== user.id
    ) {
      setStateData([dataNewOffering?.onOfferingAdded, ...stateData]);
    }
  }, [dataNewOffering, errorNewOffering, stateData, user.id]);

  return (
    <>
      {loadingTabOne && !stateData && <ActivityIndicator />}
      {
        <CustomListView
          hasNext={hasNext}
          data={stateData ? stateData : []}
          emptyMessage={
            tags.length
              ? "Aucune mission pour vos tags n'est trouvée."
              : "Veuillez tout d'abord ajouter des tags dans vos préférences."
          }
          onRefresh={onRefresh}
          modalToOpen={'Offres'}
          navigation={navigation}
          refreshing={refreshing}
          onEndReached={onEndReached}
        />
      }
    </>
  );
};

export default Offres;
