import React, { useState, useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/react-hooks';

import { Block, Text } from '../../shareComponents';
import gql from 'graphql-tag';
import { ActivityIndicator, FlatList, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
  const [stateData, setStateData] = useState(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedOffering, setSelectedOffering] = useState<string>(null);
  const [loadingTabOne, setLoadingTabOne] = useState<boolean>(false);
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
      {!(stateData?.myIncompleteOfferingCandidates.length > 0) && (
        <Text>Vous n'avez actuellement aucun candidats</Text>
      )}
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
          data={stateData?.myIncompleteOfferingCandidates}
          renderItem={({ index, item }) => {
            const { id } = item;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedOffering(id);
                  setOpenModal(true);
                }}
              ></TouchableOpacity>
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
            {/* <Icon name="close" size={24} color={themeColors.black} /> */}
          </TouchableOpacity>
          {selectedOffering && <ModalItem id={selectedOffering} />}
        </Block>
      </Modal>
    </>
  );
};

export default ManageCandidates;
