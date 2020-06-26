import React, { useState, useEffect } from 'react';
import { CustomListView } from '../../shareComponents';
import { ActivityIndicator } from 'react-native';
import ModalItem from './ModalItem';

import {
  useMyIncompleteOfferingWithCandidatesQuery,
  MyIncompleteOfferingWithCandidatesQuery
} from '../../../graphql';

const ManageCandidates = () => {
  const [stateData, setStateData] = useState<
    MyIncompleteOfferingWithCandidatesQuery
  >();
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
        modalItem={<ModalItem />}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </>
  );
};

export default ManageCandidates;
