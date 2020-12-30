import React, { useEffect, useState, FC } from 'react';
import { ActivityIndicator } from 'react-native';

import {
  useMyIncompleteOfferingQuery,
  OfferingFragment
} from '../../../graphql';
import { CustomListView } from '../../sharedComponents';
import {
  StackNavigationInterface,
  MainStackParamList
} from '../../../navigation/Routes';

interface Props {
  navigation: StackNavigationInterface<MainStackParamList, 'PrincipalView'>;
}

const ManageOffering: FC<Props> = ({ navigation }) => {
  const take = 3;
  const [stateData, setStateData] = useState<OfferingFragment[]>();
  const [loadingTabOne, setLoadingTabOne] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [lastCursorId, setLastCursorId] = useState<string | undefined>();
  const [hasNext, setHasNext] = useState<boolean>(true);

  const {
    data,
    loading,
    error,
    client,
    fetchMore
  } = useMyIncompleteOfferingQuery({
    fetchPolicy: 'cache-and-network',
    variables: { take }
  });

  const onEndReached = () => {
    hasNext &&
      fetchMore({
        variables: { take, lastCursorId: lastCursorId ? lastCursorId : '' },
        updateQuery: (previousQueryResult, { fetchMoreResult }) => {
          if (fetchMoreResult) {
            const {
              endCursor,
              hasNext
            } = fetchMoreResult?.myIncompleteOffering;
            setHasNext(hasNext);
            setLastCursorId(endCursor);
          }
          return {
            ...previousQueryResult,
            myIncompleteOffering: {
              ...previousQueryResult.myIncompleteOffering,
              ...fetchMoreResult?.myIncompleteOffering,
              offerings: [
                ...(previousQueryResult.myIncompleteOffering
                  .offerings as OfferingFragment[]),
                ...(fetchMoreResult?.myIncompleteOffering
                  .offerings as OfferingFragment[])
              ]
            }
          };
        }
      });
  };

  const onRefresh = React.useCallback(() => {
    !refreshing && setRefreshing(true);
    client.reFetchObservableQueries().then(() => setRefreshing(false));
  }, [refreshing, client]);

  useEffect(() => {
    setLoadingTabOne(loading);
  }, [loading]);

  useEffect(() => {
    if (
      !error &&
      data &&
      data.myIncompleteOffering &&
      data.myIncompleteOffering.offerings?.length
    ) {
      const { endCursor, hasNext, offerings } = data.myIncompleteOffering;
      setHasNext(hasNext);
      setLastCursorId(endCursor);
      setStateData(offerings);
    }
  }, [data, error, loading]);

  return (
    <>
      {loadingTabOne && !stateData && <ActivityIndicator />}
      {
        <CustomListView
          data={stateData ? stateData : []}
          hasNext={hasNext}
          onRefresh={onRefresh}
          refreshing={refreshing}
          navigation={navigation}
          onEndReached={onEndReached}
          modalToOpen={'ManageOffering'}
          emptyMessage={"Vous n'avez aucune offre en attente actuellement."}
        />
      }
    </>
  );
};
export default ManageOffering;
