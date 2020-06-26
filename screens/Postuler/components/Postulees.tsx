import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'

import ModalItem from './ModalItem'
import { useStoreState } from '../../../models'
import { CustomListView, dataContent } from '../../shareComponents'
import { IsCandidateToQuery, useIsCandidateToQuery, useUpdateAppliedToSubscription } from '../../../graphql'

const Postulees = () => {
  const [stateData, setStateData] = useState<IsCandidateToQuery>();
  const [loadingTabTwo, setLoadingTabTwo] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const { user } = useStoreState(state => state.User);

  const { data, loading, error, client } = useIsCandidateToQuery({
    fetchPolicy: 'cache-and-network'
  });

  const {
    data: dataUpdate,
    error: errorUpdate
  } = useUpdateAppliedToSubscription({
    variables: { userId: user?.id || '' },
    shouldResubscribe: true
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

  useEffect(() => {
    if (
      stateData?.isCandidateTo &&
      dataUpdate?.updateAppliedTo &&
      !errorUpdate
    ) {
      const updatedStatus: dataContent[] = stateData?.isCandidateTo
        .filter(offering => offering.id === dataUpdate?.updateAppliedTo?.id)
        .map(offering => {
          return { ...offering, status: dataUpdate?.updateAppliedTo?.status };
        });

      const newArray = stateData?.isCandidateTo.filter(
        offering => !(offering.id === dataUpdate?.updateAppliedTo?.id)
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
