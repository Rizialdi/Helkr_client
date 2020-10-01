import React, { SFC, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { useStoreState } from '../../../models';
import { CustomListView } from '../../sharedComponents';
import {
  IncompleteOfferingsQuery,
  useIncompleteOfferingsQuery,
  useOnOfferingAddedSubscription
} from '../../../graphql';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../../../navigation/Routes';

interface Props {
  navigation: StackNavigationProp<MainStackParamList, 'DetailOffering'>;
}

const Offres: SFC<Props> = ({ navigation }) => {
  const [stateData, setStateData] = useState<IncompleteOfferingsQuery>();
  const [loadingTabOne, setLoadingTabOne] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const { tags } = useStoreState(state => state.Offering);
  const { user } = useStoreState(state => state.User);

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
    !refreshing && setRefreshing(true);
    client.reFetchObservableQueries().then(() => setRefreshing(false));
  }, [refreshing, client]);

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
      !errorNewOffering &&
      dataNewOffering.onOfferingAdded.author.id != user.id
    ) {
      console.log(
        'dataNewOffering.onOfferingAdded',
        dataNewOffering.onOfferingAdded
      );
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
      {loadingTabOne && !stateData && <ActivityIndicator />}
      {stateData && (
        <CustomListView
          data={stateData?.incompleteOfferings}
          emptyMessage={'Aucun tag trouvé.'}
          modalToOpen={'Offres'}
          refreshing={refreshing}
          onRefresh={onRefresh}
          navigation={navigation}
        />
      )}
    </>
  );
};

export default Offres;
