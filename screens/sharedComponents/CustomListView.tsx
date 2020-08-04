import Icon from 'react-native-vector-icons/AntDesign';
import React, { SFC, useState } from 'react';
import { FlatList, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Block from './Block';
import ListItemOffering from './ListItemOffering';
import Text from './Text';
import { useStoreState } from '../../models';

export interface dataContent {
  id: string;
  type: string;
  description: string;
  category: string;
  createdAt: string;
  completed: boolean;
  status?: string | null | undefined;
}

interface Props {
  data?: dataContent[];
  onRefresh: () => void;
  emptyMessage: string;
  modalItem: JSX.Element;
  refreshing: boolean;
}
const CustomListView: SFC<Props> = ({
  data,
  onRefresh,
  emptyMessage,
  modalItem,
  refreshing
}) => {
  const [selectedOffering, setSelectedOffering] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { themeColors } = useStoreState(state => state.Preferences);
  const openToDescription = (id: string, status: string = '') => {
    setSelectedOffering(id);
    setOpenModal(true);
    setStatus(status);
  };
  const onOpenModal = () => {
    setOpenModal(false);
    setSelectedOffering('');
  };
  return (
    <Block flex={false}>
      {!data?.length && (
        <Text horizontal={30} medium vertical={30}>
          {emptyMessage}
        </Text>
      )}
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        // onEndReached={() => console.log('salut')}
        onEndReachedThreshold={0}
        pagingEnabled={true}
        alwaysBounceVertical={true}
        //ListFooterComponent={() => <ActivityIndicator size="small" />}
        keyExtractor={item => item.id}
        data={data}
        renderItem={({ item, index }) => {
          const { id } = item;
          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                (item.status && item.status === 'refusée') ||
                (item.status && item.status === 'terminée')
                  ? null
                  : item.status
                  ? openToDescription(id, item.status)
                  : openToDescription(id)
              }>
              <ListItemOffering offering={item} />
            </TouchableOpacity>
          );
        }}
      />
      <Modal
        animationType="slide"
        hardwareAccelerated={true}
        presentationStyle="overFullScreen"
        visible={openModal}>
        <Block padding={[20, 0]}>
          {selectedOffering &&
            React.cloneElement(modalItem, {
              id: selectedOffering,
              setOpenModal: onOpenModal,
              status: status
            })}
        </Block>
      </Modal>
    </Block>
  );
};

export default CustomListView;
