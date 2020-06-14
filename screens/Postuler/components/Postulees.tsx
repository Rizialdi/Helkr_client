import { useQuery, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { useStoreState } from '../../../models';
import { CustomListView } from '../../shareComponents';
import ModalItem from './ModalItem';

const APPLIEDTO = gql`
  query isCandidateTo {
    isCandidateTo {
      id
      type
      status
      category
      createdAt
      description
    }
  }
`;

const APPLIEDTO_SUBSCRIPTION = gql`
  subscription onOfferingAdded($userId: String!) {
    updateAppliedTo(userId: $userId) {
      id
      status
    }
  }
`;

const Postulees = () => {
  const [stateData, setStateData] = useState(null);
  const [loadingTabTwo, setLoadingTabTwo] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const { user } = useStoreState((state) => state.User);

  const { data, loading, error, refetch } = useQuery(APPLIEDTO, {
    fetchPolicy: 'cache-and-network'
  });

  const { data: dataUpdate, error: errorUpdate } = useSubscription(
    APPLIEDTO_SUBSCRIPTION,
    {
      variables: { userId: user.id },
      shouldResubscribe: true
    }
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (refetch) {
      //@ts-ignore
      refetch()?.then(() => setRefreshing(false));
    }
  }, [refreshing]);

  useEffect(() => {
    setLoadingTabTwo(loading);
  }, [loading]);

  useEffect(() => {
    if (!error) {
      setStateData(data || '');
    }
  }, [data, loading]);

  useEffect(() => {
    if (dataUpdate && dataUpdate?.updateAppliedTo && !errorUpdate) {
      const updatedStatus = stateData?.isCandidateTo
        .filter((offering) => offering.id === dataUpdate?.updateAppliedTo?.id)
        .map((offering) => {
          return { ...offering, status: dataUpdate?.updateAppliedTo?.status };
        });

      const newArray = stateData?.isCandidateTo.filter(
        (offering) => !(offering.id === dataUpdate?.updateAppliedTo?.id)
      );
      setStateData({
        isCandidateTo: updatedStatus.concat(newArray)
      });
    }
  }, [dataUpdate]);

  return (
    <>
      {loadingTabTwo && <ActivityIndicator />}
      <CustomListView
        data={stateData?.isCandidateTo}
        emptyMessage={"Vous n'avez aucune candidature"}
        modalItem={<ModalItem />}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </>
  );
};

export default Postulees;
