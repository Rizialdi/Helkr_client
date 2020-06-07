import { useQuery, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  FlatList,
  ActivityIndicator,
  Modal
} from 'react-native';
import { useStoreState } from '../../models';
import { Text, Block, Layout } from '../shareComponents';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/AntDesign';

import { ListItem, ModalItem } from './components';
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
const Postuler = () => {
  const [stateData, setStateData] = useState(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedOffering, setSelectedOffering] = useState<string>(null);
  const [activeTab, setActiveTab] = useState<string>(null);
  const [loadingTabOne, setLoadingTabOne] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const tabs = ['Offres', 'Postulées'];
  const { themeColors } = useStoreState((state) => state.Preferences);

  const {
    data: dataOffering,
    loading: loadingOffering,
    error: errorOffering,
    refetch
  } = useQuery(OFFERINGS, {
    fetchPolicy: 'cache-first',
    variables: { filters: ['Réparateur', 'Ménage'] }
  });

  const { data: dataNewOffering, error: errorNewOffering } = useSubscription(
    OFFERINGS_SUBSCRIPTION,
    {
      variables: { tags: ['Ménage', 'Réparateur', 'Réparation'] },
      shouldResubscribe: true
    }
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (refetch) {
      refetch()?.then(() => setRefreshing(false));
    }
  }, [refreshing]);

  useEffect(() => {
    setSelectedOffering('');
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
        <Block flex={false}>
          {/* <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            pagingEnabled={true}
            alwaysBounceVertical={true}
          >
            

            {/* stateData?.incompleteOfferings?.map((offering) => {
                const { id } = offering;
                return (
                  <TouchableOpacity
                    key={id}
                    onPress={() => {
                      setSelectedOffering(id);
                      setOpenModal(true);
                      console.log(selectedOffering);
                    }}
                  >
                    <ListItem offering={offering} />
                  </TouchableOpacity>
                );
              }) */}
          {activeTab === tabs[0] && loadingTabOne && <ActivityIndicator />}
          {activeTab === tabs[0] && (
            <FlatList
              refreshing={refreshing}
              onRefresh={onRefresh}
              onEndReached={() => console.log('salut')}
              onEndReachedThreshold={0}
              pagingEnabled={true}
              alwaysBounceVertical={true}
              ListFooterComponent={() => <ActivityIndicator size="small" />}
              keyExtractor={(item) => item.id}
              data={stateData?.incompleteOfferings}
              renderItem={({ index, item }) => {
                const { id } = item;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedOffering(id);
                      setOpenModal(true);
                      console.log(selectedOffering);
                    }}
                  >
                    <ListItem offering={item} />
                  </TouchableOpacity>
                );
              }}
            />
          )}
          <Modal
            animationType="slide"
            hardwareAccelerated={true}
            presentationStyle="overFullScreen"
            visible={openModal}
          >
            <Block padding={[20, 0]}>
              <TouchableOpacity
                onPress={() => {
                  setOpenModal(false);
                  setSelectedOffering('');
                }}
              >
                <Icon name="close" size={24} color={themeColors.black} />
              </TouchableOpacity>
              {selectedOffering && <ModalItem id={selectedOffering} />}
            </Block>
          </Modal>
        </Block>
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
