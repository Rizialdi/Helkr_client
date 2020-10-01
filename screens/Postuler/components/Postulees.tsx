import React, { useEffect, useState, SFC } from 'react';
import { ActivityIndicator } from 'react-native';

import { useStoreState } from '../../../models';
import { CustomListView, DataContent } from '../../sharedComponents';
import {
  IsCandidateToQuery,
  useIsCandidateToQuery,
  useUpdateAppliedToSubscription
} from '../../../graphql';
import { sortPostuleeOnInterest } from '../../../utils';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../../../navigation/Routes';

interface Props {
  navigation: StackNavigationProp<MainStackParamList, 'DetailOffering'>;
}

const Postulees: SFC<Props> = ({ navigation }) => {
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
      const updatedStatus: DataContent[] = stateData?.isCandidateTo
        .filter(offering => offering.id === dataUpdate?.updateAppliedTo?.id)
        .map(offering => {
          return { ...offering, status: dataUpdate?.updateAppliedTo?.status };
        });

      const newArray = stateData?.isCandidateTo.filter(
        offering => !(offering.id === dataUpdate?.updateAppliedTo?.id)
      );
      setStateData({
        //@ts-ignore
        isCandidateTo: updatedStatus.concat(newArray)
      });
    }
  }, [dataUpdate]);
  return (
    <>
      {loadingTabTwo && !stateData && <ActivityIndicator />}
      {stateData && (
        <CustomListView
          // TODO resolve typescrit linting
          data={sortPostuleeOnInterest(stateData?.isCandidateTo)}
          emptyMessage={"Vous n'avez aucune candidature"}
          refreshing={refreshing}
          onRefresh={onRefresh}
          navigation={navigation}
          modalToOpen={'Postulees'}
        />
      )}
    </>
  );
};

export default Postulees;
