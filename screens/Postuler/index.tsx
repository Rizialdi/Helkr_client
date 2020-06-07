import { useQuery, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  ActivityIndicator
} from 'react-native';
import { useStoreState } from '../../models';
import { Text, Block, Layout } from '../shareComponents';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import { ListItem } from './components';
const OFFERINGS = gql`
  query {
    incompleteOfferings {
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
const Postuler = () => {
  // const { data, loading, error } = useQuery(INFO);
  const {
    data: dataOffering,
    loading: loadingOffering,
    error: errorOffering,
    refetch
  } = useQuery(OFFERINGS, {
    fetchPolicy: 'cache-and-network'
  });
  const [stateData, setStateData] = useState(null);
  const [activeTab, setActiveTab] = useState<string>(null);
  const [loadingTabOne, setLoadingTabOne] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const tabs = ['Offres', 'Postulées'];
  const { themeColors } = useStoreState((state) => state.Preferences);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (refetch) {
      refetch().then(() => setRefreshing(false));
    }
  }, [refreshing]);

  const { data: dataNewOffering, error: errorNewOffering } = useSubscription(
    OFFERINGS_SUBSCRIPTION,
    {
      variables: { tags: ['Ménage', 'Réparateur'] },
      shouldResubscribe: true
    }
  );

  useEffect(() => {
    setActiveTab('Offres');
  }, []);

  useEffect(() => {
    setLoadingTabOne(loadingOffering);
  }, [loadingOffering]);

  useEffect(() => {
    if (dataOffering && !errorOffering) {
      setStateData(dataOffering);
    }
  }, [dataOffering, loadingOffering]);

  useEffect(() => {
    if (dataNewOffering && dataNewOffering?.newOffering && !errorNewOffering) {
      setStateData({
        incompleteOfferings: [
          dataNewOffering?.newOffering,
          ...stateData.incompleteOfferings
        ]
      });
    }
  }, [dataNewOffering]);

  const renderTab = (tab) => {
    const isActive = activeTab == tab;
    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => setActiveTab(tab)}
        style={[
          styles.tab,
          isActive
            ? {
                borderBottomColor: themeColors.secondary,
                borderBottomWidth: 2
              }
            : null
        ]}
      >
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Layout title={'Naviguer'}>
      <>
        <Block
          flex={false}
          row
          middle
          shadow
          animated
          space={'around'}
          style={{
            borderBottomColor: themeColors.gray2,
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginVertical: 10,
            marginHorizontal: 20
          }}
        >
          {tabs.map((tab) => renderTab(tab))}
        </Block>
        <View style={{ marginBottom: 100 }}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            pagingEnabled={true}
            alwaysBounceVertical={true}
          >
            {activeTab === tabs[0] && loadingTabOne && <ActivityIndicator />}
            {activeTab === tabs[0] &&
              stateData?.incompleteOfferings?.map((offering) => (
                <TouchableOpacity key={offering.id}>
                  <ListItem offering={offering} />
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  tab: {
    marginRight: 14,
    paddingBottom: 10
  }
});

export default Postuler;
