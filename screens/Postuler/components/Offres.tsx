import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import ModalItemApplyToOffering from './ModalItemApplyToOffering';
import { useStoreState } from '../../../models';
import { CustomListView } from '../../sharedComponents';
import {
  IncompleteOfferingsQuery,
  useIncompleteOfferingsQuery,
  useOnOfferingAddedSubscription
} from '../../../graphql';

const Offres = () => {
  const [stateData, setStateData] = useState<IncompleteOfferingsQuery>();
  const [loadingTabOne, setLoadingTabOne] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const { tags } = useStoreState(state => state.Offering);

  const { data, loading, error, client } = useIncompleteOfferingsQuery({
    fetchPolicy: 'cache-and-network',
    variables: { filters: tags }
  });

  const {
    data: dataNewOffering,
    error: errorNewOffering
  } = useOnOfferingAddedSubscription({
    variables: { tags },
    shouldResubscribe: true
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    client.reFetchObservableQueries().then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    setLoadingTabOne(true);
    client.reFetchObservableQueries().then(() => setLoadingTabOne(false));
  }, [tags]);

  useEffect(() => {
    setLoadingTabOne(loading);
  }, [loading]);

  useEffect(() => {
    if (!error) {
      setStateData(data);
    }
  }, [data, loading]);

  useEffect(() => {
    if (
      dataNewOffering &&
      stateData?.incompleteOfferings &&
      dataNewOffering?.onOfferingAdded &&
      !errorNewOffering
    ) {
      setStateData({
        incompleteOfferings: [
          dataNewOffering?.onOfferingAdded,
          ...stateData?.incompleteOfferings
        ]
      });
    }
  }, [dataNewOffering]);

  return (
    <>
      {loadingTabOne && <ActivityIndicator />}
      {stateData && (
        <CustomListView
          data={stateData?.incompleteOfferings}
          emptyMessage={'Aucun tag trouvé.'}
          modalItem={<ModalItemApplyToOffering />}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </>
  );
};

export default Offres;
