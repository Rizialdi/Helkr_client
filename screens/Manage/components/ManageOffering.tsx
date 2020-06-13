import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

import { Block, Text } from '../../shareComponents';
import ListItemOffering from './ListItemOffering';
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
  const [stateData, setStateData] = useState(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedOffering, setSelectedOffering] = useState<string>(null);
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
      //@ts-ignore
      refetch()?.then(() => setRefreshing(false));
    }
  }, [refreshing]);

  useEffect(() => {
    setSelectedOffering('');
  }, []);

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
      {/* TODO make sur not data appears when stateData empty */}
      {!stateData?.myIncompleteOffering && (
        <Text>Vous n'avez actuellement aucune demande</Text>
      )}

      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        // onEndReached={() => console.log('salut')}
        onEndReachedThreshold={0}
        pagingEnabled={true}
        alwaysBounceVertical={true}
        //ListFooterComponent={() => <ActivityIndicator size="small" />}
        keyExtractor={(item) => item.id}
        data={stateData?.myIncompleteOffering}
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
              <ListItemOffering offering={item} />
            </TouchableOpacity>
          );
        }}
      />

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
            <Icon name="close" size={24} />
          </TouchableOpacity>
          {selectedOffering && <ModalItem id={selectedOffering} />}
        </Block>
      </Modal>
    </>
  );
};
export default ManageOffering;
