import React, { useState, useEffect } from 'react';
import { CustomListView } from '../../shareComponents';
import { ActivityIndicator } from 'react-native';
import { useStoreState } from '../../../models';
import ModalItemManageCandidates from './ModalItemManageCandidates';
import {
  MyIncompleteOfferingQuery,
  OfferingByIdDocument,
  OfferingByIdQuery
} from '../../../graphql/helpkr-types';
import {
  useMyIncompleteOfferingWithCandidatesQuery,
  MyIncompleteOfferingWithCandidatesQuery,
  useUpdatedEventDaySubscription
} from '../../../graphql';
import { DataProxy } from 'apollo-cache';
import { cache } from '../../../ApolloClient';

const ManageCandidates = () => {
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

  const updateOfferingEventDay = (id: string, eventday: string) => {
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
    error: error,
    client
  } = useMyIncompleteOfferingWithCandidatesQuery({
    fetchPolicy: 'cache-and-network'
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    client.reFetchObservableQueries().then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    setLoadingTabTwo(loading);
  }, [loading]);

  useEffect(() => {
    if (!error && data) {
      setStateData(data);
    }
  }, [data, loading]);

  return (
    <>
      {loadingTabTwo && <ActivityIndicator />}

      <CustomListView
        data={stateData?.myIncompleteOfferingWithCandidates}
        emptyMessage={'Aucun candidat à une offre actuellement'}
        modalItem={<ModalItemManageCandidates />}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </>
  );
};

export default ManageCandidates;
