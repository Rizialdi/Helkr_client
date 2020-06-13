import { useQuery, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

import { useStoreState } from '../../../models';
import { Block, Text } from '../../shareComponents';
import ListItem from './ListItemOffering';
import ModalItem from './ModalItem';

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
const Offres = () => {
  const [stateData, setStateData] = useState(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedOffering, setSelectedOffering] = useState<string>(null);
  const [loadingTabOne, setLoadingTabOne] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const { themeColors } = useStoreState((state) => state.Preferences);
  const { tags } = useStoreState((state) => state.Offering);

  const { data, loading: loading, error: error, refetch } = useQuery(
    OFFERINGS,
    {
      fetchPolicy: 'cache-and-network',
      variables: { filters: tags }
    }
  );

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
    setSelectedOffering('');
  }, []);

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
    if (dataNewOffering && dataNewOffering?.newOffering && !errorNewOffering) {
      setStateData({
        incompleteOfferings: [
          dataNewOffering?.newOffering,
          ...stateData.incompleteOfferings
        ]
      });
    }
  }, [dataNewOffering]);

  return (
    <>
      {loadingTabOne && <ActivityIndicator />}
      {/* TODO make sur not data appears when stateData empty */}
      {!stateData?.incompleteOfferings && <Text>Not data baby</Text>}
      {
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          // onEndReached={() => console.log('salut')}
          onEndReachedThreshold={0}
          pagingEnabled={true}
          alwaysBounceVertical={true}
          //ListFooterComponent={() => <ActivityIndicator size="small" />}
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
                }}
              >
                <ListItem offering={item} />
              </TouchableOpacity>
            );
          }}
        />
      }
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
    </>
  );
};

export default Offres;
