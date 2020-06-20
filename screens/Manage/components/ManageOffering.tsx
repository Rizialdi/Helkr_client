import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { CustomListView, dataContent } from '../../shareComponents';
import ModalItem from './ModalItem';

const MY_OFFERINGS = gql`
  query myIncompleteOffering {
    myIncompleteOffering {
      id
      type
      category
      description
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

const ManageOffering = () => {
  const [stateData, setStateData] = useState<{
    myIncompleteOffering?: dataContent[];
  }>();
  const [loadingTabOne, setLoadingTabOne] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const { data, loading: loading, error: error, refetch } = useQuery(
    MY_OFFERINGS,
    {
      fetchPolicy: 'cache-and-network'
    }
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (refetch) {
      refetch().then(() => setRefreshing(false));
    }
  }, [refreshing]);

  useEffect(() => {
    setLoadingTabOne(loading);
  }, [loading]);

  useEffect(() => {
    if (!error) {
      setStateData(data || '');
    }
  }, [data, loading]);

  return (
    <>
      {loadingTabOne && <ActivityIndicator />}
      <CustomListView
        data={stateData?.myIncompleteOffering}
        emptyMessage={"Vous n'avez aucune offre actuellement"}
        modalItem={<ModalItem />}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </>
  );
};
export default ManageOffering;
