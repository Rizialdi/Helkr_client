import React, { useState, useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/react-hooks';

import { CustomListView, dataContent } from '../../shareComponents';
import gql from 'graphql-tag';
import { ActivityIndicator } from 'react-native';
import ModalItem from './ModalItem';

const MY_INCOMPLETE_OFFERINGS_CANDIDATES = gql`
  query myIncompleteOfferingCandidates {
    myIncompleteOfferingCandidates {
      id
      type
      category
      description
      status
      createdAt
    }
  }
`;

// const OFFERINGS_SUBSCRIPTION = gql`
//   subscription onOfferingAdded($tags: [String!]) {
//     newOffering(tags: $tags) {
//       id
//       type
//       category
//       description
//       createdAt
//     }
//   }
// `;

const ManageCandidates = () => {
  const [stateData, setStateData] = useState<{
    myIncompleteOfferingCandidates?: dataContent[];
  }>();
  const [loadingTabTwo, setLoadingTabTwo] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const { data, loading: loading, error: error, refetch } = useQuery(
    MY_INCOMPLETE_OFFERINGS_CANDIDATES,
    {
      fetchPolicy: 'cache-and-network'
    }
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (refetch) {
      //@ts-ignore
      refetch()?.then(() => setRefreshing(false));
    }
  }, [refreshing]);

  useEffect(() => {
    setLoadingTabTwo(loading);
  }, [loading]);

  useEffect(() => {
    if (!error) {
      setStateData(data || '');
    }
  }, [data, loading]);

  return (
    <>
      {loadingTabTwo && <ActivityIndicator />}

      <CustomListView
        data={stateData?.myIncompleteOfferingCandidates}
        emptyMessage={'Aucun candidat à une offre actuellement'}
        modalItem={<ModalItem />}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </>
  );
};

export default ManageCandidates;
