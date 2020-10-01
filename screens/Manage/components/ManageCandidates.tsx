import React, { useState, useEffect, SFC } from 'react';
import { ActivityIndicator } from 'react-native';

import { useStoreState } from '../../../models';
import { CustomListView } from '../../sharedComponents';
import {
  OfferingByIdQuery,
  OfferingByIdDocument,
  useUpdatedEventDaySubscription,
  MyIncompleteOfferingWithCandidatesQuery,
  useMyIncompleteOfferingWithCandidatesQuery
} from '../../../graphql';
import { cache } from '../../../ApolloClient';
import { MainStackParamList } from '../../../navigation/Routes';
import { StackNavigationProp } from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<MainStackParamList, 'DetailOffering'>;
}

const ManageCandidates: SFC<Props> = ({ navigation }) => {
  const {
    user: { id: userId }
  } = useStoreState(state => state.User);
  const [stateData, setStateData] = useState<
    MyIncompleteOfferingWithCandidatesQuery
  >();

  const {
    data: dataUpdateEventDay,
    error: errorUpdateEventDay
  } = useUpdatedEventDaySubscription({
    variables: { userId: userId as string },
    shouldResubscribe: true
  });

  const updateOfferingEventDay = (id: string, eventday: string): void => {
    if (!id) return;

    const offeringById = cache.readQuery({
      query: OfferingByIdDocument,
      variables: { id }
    }) as OfferingByIdQuery | undefined;

    const newOfferingById = {
      ...offeringById,
      offeringById: {
        ...offeringById?.offeringById,
        eventday
      }
    };

    cache.writeQuery({
      query: OfferingByIdDocument,
      variables: { id },
      data: newOfferingById
    });
  };

  useEffect(() => {
    if (dataUpdateEventDay?.updatedEventDay && !errorUpdateEventDay) {
      const { offeringId, eventday } = dataUpdateEventDay.updatedEventDay;
      if (!data?.myIncompleteOfferingWithCandidates) return;

      const newOfferingData = data?.myIncompleteOfferingWithCandidates.map(
        item => {
          if (item.id != offeringId) return item;
          return { ...item, eventday };
        }
      );
      if (!newOfferingData) return;
      const newData = {
        ...data,
        myIncompleteOfferingWithCandidates: newOfferingData
      };
      setStateData(newData);
      updateOfferingEventDay(offeringId, eventday);
    }
  }, [dataUpdateEventDay]);

  const [loadingTabTwo, setLoadingTabTwo] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const {
    data,
    loading,
    error,
    client
  } = useMyIncompleteOfferingWithCandidatesQuery({
    fetchPolicy: 'cache-and-network'
  });

  const onRefresh = React.useCallback(() => {
    !refreshing && setRefreshing(true);
    client.reFetchObservableQueries().then(() => setRefreshing(false));
  }, [refreshing, client]);

  useEffect(() => {
    setLoadingTabTwo(loading);
  }, [loading]);

  useEffect(() => {
    if (!error && data) {
      setStateData(data);
    }
  }, [data, loading, error]);

  return (
    <>
      {loadingTabTwo && !stateData && <ActivityIndicator />}

      {stateData && (
        <CustomListView
          data={stateData?.myIncompleteOfferingWithCandidates}
          emptyMessage={'Aucun candidat à une offre actuellement'}
          refreshing={refreshing}
          onRefresh={onRefresh}
          navigation={navigation}
          modalToOpen={'ManageCandidates'}
        />
      )}
    </>
  );
};

export default ManageCandidates;
