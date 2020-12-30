import React, { useEffect, useState, SFC } from 'react';
import { ActivityIndicator } from 'react-native';

import { useStoreState } from '../../../models';
import { CustomListView } from '../../sharedComponents';
import {
  useIsCandidateToQuery,
  useUpdateAppliedToSubscription,
  OfferingFragment,
  Offering
} from '../../../graphql';
import { sortPostuleeOnInterest } from '../../../utils';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../../../navigation/Routes';

interface Props {
  navigation: StackNavigationProp<MainStackParamList, 'DetailOffering'>;
}
type LocalOffering = Array<
  { __typename?: 'offering' } & Pick<
    Offering,
    'status' | 'eventday' | 'completed'
  > &
    OfferingFragment
>;

const Postulees: SFC<Props> = ({ navigation }) => {
  const take = 3;
  const [stateData, setStateData] = useState<LocalOffering | null>();
  const [loadingTabTwo, setLoadingTabTwo] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [lastCursorId, setLastCursorId] = useState<string | undefined>();
  const [hasNext, setHasNext] = useState<boolean>(true);

  const { user } = useStoreState(state => state.User);

  const { data, loading, error, client, fetchMore } = useIsCandidateToQuery({
    fetchPolicy: 'cache-and-network',
    variables: { take }
  });

  const {
    data: dataUpdate,
    error: errorUpdate
  } = useUpdateAppliedToSubscription({
    variables: { userId: user?.id || '' },
    shouldResubscribe: true
  });

  const onEndReached = () => {
    hasNext &&
      fetchMore({
        variables: { take, lastCursorId: lastCursorId ? lastCursorId : '' },
        updateQuery: (previousQueryResult, { fetchMoreResult }) => {
          if (
            fetchMoreResult &&
            fetchMoreResult.isCandidateTo &&
            fetchMoreResult.isCandidateTo.offerings?.length
          ) {
            const { endCursor, hasNext } = fetchMoreResult?.isCandidateTo;
            setHasNext(hasNext);
            setLastCursorId(endCursor);
          }
          return {
            ...previousQueryResult,
            isCandidateTo: {
              ...previousQueryResult.isCandidateTo,
              ...fetchMoreResult?.isCandidateTo,
              offerings: [
                ...(previousQueryResult.isCandidateTo
                  .offerings as LocalOffering),
                ...(fetchMoreResult?.isCandidateTo.offerings as LocalOffering)
              ]
            }
          };
        }
      });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    client.reFetchObservableQueries().then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    setLoadingTabTwo(loading);
  }, [loading]);

  useEffect(() => {
    if (
      !error &&
      data &&
      data.isCandidateTo &&
      data.isCandidateTo.offerings?.length
    ) {
      const { hasNext, endCursor, offerings } = data.isCandidateTo;
      setHasNext(hasNext);
      setLastCursorId(endCursor);
      setStateData(offerings);
    }
  }, [data, loading]);

  useEffect(() => {
    if (stateData && dataUpdate?.updateAppliedTo && !errorUpdate) {
      const updatedStatus = stateData
        .filter(offering => offering.id === dataUpdate?.updateAppliedTo?.id)
        .map(offering => {
          return { ...offering, status: dataUpdate?.updateAppliedTo?.status };
        });

      const newArray = stateData.filter(
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
      {
        <CustomListView
          hasNext={hasNext}
          data={sortPostuleeOnInterest(stateData)}
          emptyMessage={"Vous n'avez aucune candidature."}
          refreshing={refreshing}
          onRefresh={onRefresh}
          navigation={navigation}
          modalToOpen={'Postulees'}
          onEndReached={onEndReached}
        />
      }
    </>
  );
};

export default Postulees;
