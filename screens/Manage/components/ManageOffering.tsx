import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import {
  useMyIncompleteOfferingQuery,
  MyIncompleteOfferingQuery
} from '../../../graphql';

import { CustomListView } from '../../sharedComponents';
import ModalItemManageOfferings from './ModalItemManageOfferings';

const ManageOffering = () => {
  const [stateData, setStateData] = useState<MyIncompleteOfferingQuery>();
  const [loadingTabOne, setLoadingTabOne] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const {
    data,
    loading: loading,
    error: error,
    client
  } = useMyIncompleteOfferingQuery({
    fetchPolicy: 'cache-and-network'
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    client.reFetchObservableQueries().then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    setLoadingTabOne(loading);
  }, [loading]);

  useEffect(() => {
    if (!error && data) {
      setStateData(data);
    }
  }, [data, loading]);

  return (
    <>
      {loadingTabOne && <ActivityIndicator />}
      <CustomListView
        data={stateData?.myIncompleteOffering}
        emptyMessage={"Vous n'avez aucune offre actuellement"}
        modalItem={<ModalItemManageOfferings />}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </>
  );
};
export default ManageOffering;
