import React, { useEffect, useState, FC } from 'react';
import { ActivityIndicator } from 'react-native';

import {
  useMyIncompleteOfferingQuery,
  MyIncompleteOfferingQuery
} from '../../../graphql';
import { CustomListView } from '../../sharedComponents';
import ModalItemManageOfferings from './ModalItemManageOfferings';
import {
  StackNavigationInterface,
  MainStackParamList
} from '../../../navigation/Routes';

interface Props {
  navigation: StackNavigationInterface<MainStackParamList, 'PrincipalView'>;
}

const ManageOffering: FC<Props> = ({ navigation }) => {
  const [stateData, setStateData] = useState<MyIncompleteOfferingQuery>();
  const [loadingTabOne, setLoadingTabOne] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const { data, loading, error, client } = useMyIncompleteOfferingQuery({
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
  }, [data, error, loading]);

  return (
    <>
      {loadingTabOne && !stateData && <ActivityIndicator />}
      {stateData && (
        <CustomListView
          data={stateData?.myIncompleteOffering}
          emptyMessage={"Vous n'avez aucune offre actuellement"}
          modalItem={<ModalItemManageOfferings />}
          refreshing={refreshing}
          onRefresh={onRefresh}
          navigation={navigation}
        />
      )}
    </>
  );
};
export default ManageOffering;
