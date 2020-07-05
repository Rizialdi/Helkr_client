import Icon from 'react-native-vector-icons/AntDesign';
import React, { FC, useState } from 'react';
import { FlatList, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Block from './Block';
import ListItemOffering from './ListItemOffering';
import Text from './Text';
import { useStoreState } from '../../models';
import { MyIncompleteOfferingQuery } from '../../graphql/helpkr-types';

export interface dataContent {
  id: string;
  type: string;
  description: string;
  category: string;
  createdAt: string;
  status?: string | null | undefined;
}

interface Props {
  data?: any;
  onRefresh: () => void;
  emptyMessage: string;
  modalItem: JSX.Element;
  refreshing: boolean;
}
const CustomListView: FC<Props> = ({
  data,
  onRefresh,
  emptyMessage,
  modalItem,
  refreshing
}) => {
  const [selectedOffering, setSelectedOffering] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { themeColors } = useStoreState(state => state.Preferences);

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
              onPress={() => {
                setSelectedOffering(id);
                setOpenModal(true);
              }}>
              <ListItemOffering offering={item} />
            </TouchableOpacity>
          );
        }}
      />
      <Modal
        animationType="fade"
        hardwareAccelerated={true}
        presentationStyle="overFullScreen"
        visible={openModal}>
        <Block padding={[20, 0]}>
          <TouchableOpacity
            onPress={() => {
              setOpenModal(false);
              setSelectedOffering('');
            }}>
            <Icon name="close" size={24} color={themeColors.black} />
          </TouchableOpacity>
          {selectedOffering &&
            React.cloneElement(modalItem, { id: selectedOffering })}
        </Block>
      </Modal>
    </Block>
  );
};

export default CustomListView;
