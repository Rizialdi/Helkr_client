import React, { SFC, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import {
  OfferingFragment,
  useMyIncompleteOfferingWithCandidatesQuery
} from '../../../graphql';
import { BottomStackParamList } from '../../../navigation/Routes';
import { CustomListView } from '../../sharedComponents';

interface Props {
  navigation: StackNavigationProp<BottomStackParamList, 'Gerer'>;
}

const ManageCandidates: SFC<Props> = ({ navigation }) => {
  const take = 3;
  const [stateData, setStateData] = useState<OfferingFragment[]>();
  const [loadingTabTwo, setLoadingTabTwo] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [lastCursorId, setLastCursorId] = useState<string | undefined>();
  const [hasNext, setHasNext] = useState<boolean>(true);

  const {
    data,
    loading,
    error,
    client,
    fetchMore
  } = useMyIncompleteOfferingWithCandidatesQuery({
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
            } = fetchMoreResult?.myIncompleteOfferingWithCandidates;
            setHasNext(hasNext);
            setLastCursorId(endCursor);
          }
          return {
            ...previousQueryResult,
            myIncompleteOfferingWithCandidates: {
              ...previousQueryResult.myIncompleteOfferingWithCandidates,
              ...fetchMoreResult?.myIncompleteOfferingWithCandidates,
              offerings: [
                ...(previousQueryResult.myIncompleteOfferingWithCandidates
                  .offerings as OfferingFragment[]),
                ...(fetchMoreResult?.myIncompleteOfferingWithCandidates
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
    setLoadingTabTwo(loading);
  }, [loading]);

  useEffect(() => {
    if (
      !error &&
      data &&
      data.myIncompleteOfferingWithCandidates.offerings?.length
    ) {
      const {
        endCursor,
        hasNext,
        offerings
      } = data.myIncompleteOfferingWithCandidates;
      setHasNext(hasNext);
      setLastCursorId(endCursor);
      setStateData(offerings);
    }
  }, [data, loading, error]);

  return (
    <>
      {loadingTabTwo && !stateData && <ActivityIndicator />}

      {
        <CustomListView
          data={stateData ? stateData : []}
          hasNext={hasNext}
          onRefresh={onRefresh}
          navigation={navigation}
          refreshing={refreshing}
          onEndReached={onEndReached}
          modalToOpen={'ManageCandidates'}
          emptyMessage={'Aucun candidat à une offre actuellement.'}
        />
      }
    </>
  );
};

export default ManageCandidates;
