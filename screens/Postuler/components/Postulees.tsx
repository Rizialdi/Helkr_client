import {
  useQuery,
  useSubscription,
  useApolloClient
} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import { Block, Text } from '../../shareComponents';
import ListItem from './ListItemApplied';
import ModalItem from './ModalItem';
import { useStoreState } from '../../../models';

const APPLIEDTO = gql`
  query isCandidateTo {
    isCandidateTo {
      id
      type
      status
      category
      createdAt
      description
    }
  }
`;

const APPLIEDTO_SUBSCRIPTION = gql`
  subscription onOfferingAdded($userId: String!) {
    updateAppliedTo(userId: $userId) {
      id
      status
    }
  }
`;

const Postulees = () => {
  const [stateData, setStateData] = useState(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedOffering, setSelectedOffering] = useState<string>(null);
  const [loadingTabTwo, setLoadingTabTwo] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const { user } = useStoreState((state) => state.User);

  const { data, loading, error, refetch } = useQuery(APPLIEDTO, {
    fetchPolicy: 'cache-and-network'
  });

  const { data: dataUpdate, error: errorUpdate } = useSubscription(
    APPLIEDTO_SUBSCRIPTION,
    {
      variables: { userId: user.id },
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
    setLoadingTabTwo(loading);
  }, [loading]);

  useEffect(() => {
    if (!error) {
      setStateData(data || '');
    }
  }, [data, loading]);
  const client = useApolloClient();
  useEffect(() => {
    if (dataUpdate && dataUpdate?.updateAppliedTo && !errorUpdate) {
      const updatedStatus = stateData?.isCandidateTo
        .filter((offering) => offering.id === dataUpdate?.updateAppliedTo?.id)
        .map((offering) => {
          return { ...offering, status: dataUpdate?.updateAppliedTo?.status };
        });

      const newArray = stateData?.isCandidateTo.filter(
        (offering) => !(offering.id === dataUpdate?.updateAppliedTo?.id)
      );
      setStateData({
        isCandidateTo: updatedStatus.concat(newArray)
      });
    }
  }, [dataUpdate]);

  return (
    <>
      {loadingTabTwo && <ActivityIndicator />}
      {/* TODO make sur not data appears when stateData empty */}
      {!stateData?.isCandidateTo && <Text>Vous n'avez aucune candidature</Text>}
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
          data={stateData?.isCandidateTo}
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
                <ListItem appliedTo={item} />
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
            <Icon name="close" size={24} />
          </TouchableOpacity>
          {selectedOffering && <ModalItem id={selectedOffering} />}
        </Block>
      </Modal>
    </>
  );
};

export default Postulees;
