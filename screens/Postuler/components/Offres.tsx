import { useQuery, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { useStoreState } from '../../../models';
import { CustomListView, dataContent } from '../../shareComponents';
import ModalItem from './ModalItem';

const Offres = () => {
  const [stateData, setStateData] = useState<{
    incompleteOfferings?: dataContent[];
  }>();
  const [loadingTabOne, setLoadingTabOne] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const { tags } = useStoreState(state => state.Offering);

  const { data, loading, error, refetch } = useQuery(OFFERINGS, {
    fetchPolicy: 'cache-and-network',
    variables: { filters: tags }
  });

  const { data: dataNewOffering, error: errorNewOffering } = useSubscription(
    OFFERINGS_SUBSCRIPTION,
    {
      variables: { tags },
      shouldResubscribe: true
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
    setLoadingTabOne(true);
    if (refetch) {
      //@ts-ignore
      refetch()?.then(() => setLoadingTabOne(false));
    }
  }, [tags]);

  useEffect(() => {
    setLoadingTabOne(loading);
  }, [loading]);

  useEffect(() => {
    if (!error) {
      setStateData(data || '');
    }
  }, [data, loading]);

  useEffect(() => {
    if (
      dataNewOffering &&
      stateData?.incompleteOfferings &&
      dataNewOffering?.newOffering &&
      !errorNewOffering
    ) {
      setStateData({
        incompleteOfferings: [
          dataNewOffering?.newOffering,
          ...stateData?.incompleteOfferings
        ]
      });
    }
  }, [dataNewOffering]);

  return (
    <>
      {loadingTabOne && <ActivityIndicator />}
      <CustomListView
        data={stateData?.incompleteOfferings}
        emptyMessage={'Aucune offre disponible'}
        modalItem={<ModalItem />}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </>
  );
};

const OFFERINGS = gql`
  query incompleteOfferings($filters: [String!]) {
    incompleteOfferings(filters: $filters) {
      id
      type
      category
      description
      createdAt
    }
  }
`;

const OFFERINGS_SUBSCRIPTION = gql`
  subscription onOfferingAdded($tags: [String!]) {
    newOffering(tags: $tags) {
      id
      type
      category
      description
      createdAt
    }
  }
`;

export default Offres;
