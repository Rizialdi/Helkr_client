import React, { SFC } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { StackNavigationProp } from '@react-navigation/stack';

import { theme } from '../../constants';
import { MainStackParamList } from '../../navigation/Routes';
import Block from './Block';
import ListItemOffering from './ListItemOffering';
import Text from './Text';

export interface DataContent {
  id: string;
  type: string;
  description: string;
  category: string;
  createdAt: string;
  completed: boolean;
  status?: string | null | undefined;
  modalToOpen: string;
}

interface Props {
  data?: DataContent[];
  onRefresh: () => void;
  onEndReached?: () => void;
  emptyMessage: string;
  modalToOpen: 'ManageCandidates' | 'ManageOffering' | 'Postulees' | 'Offres';
  refreshing: boolean;
  hasNext?: boolean;
  navigation: StackNavigationProp<MainStackParamList, 'DetailOffering'>;
}
const CustomListView: SFC<Props> = ({
  data,
  hasNext,
  onRefresh,
  emptyMessage,
  refreshing,
  navigation,
  modalToOpen,
  onEndReached
}) => {
  const openToDescription = (id: string, status: string): void => {
    if (!modalToOpen) return;

    switch (modalToOpen) {
      case 'ManageCandidates':
        navigation.navigate('DetailOffering', {
          screen: 'MyCandidateToOffering',
          params: { id }
        });
        break;
      case 'ManageOffering':
        navigation.navigate('DetailOffering', {
          screen: 'MyOfferingsModal',
          params: { id }
        });
        break;
      case 'Postulees':
        navigation.navigate('DetailOffering', {
          screen: 'MyAppliedOfferingModal',
          params: { id, status }
        });
        break;
      default:
        navigation.navigate('DetailOffering', {
          screen: 'OfferingsListModal',
          params: { id }
        });
        break;
    }
  };

  return (
    <Block flex={false}>
      {!data?.length && (
        <Text
          body
          horizontal={theme.sizes.twiceTen * 1.5}
          vertical={theme.sizes.htwiceTen * 1.5}>
          {emptyMessage}
        </Text>
      )}
      <FlatList
        style={{
          height: (theme.sizes.screenHeight * 3.5) / 5
        }}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={hasNext ? onEndReached : null}
        onEndReachedThreshold={0}
        pagingEnabled={true}
        alwaysBounceVertical={true}
        ListFooterComponent={
          !hasNext || !data?.length ? <></> : <ActivityIndicator size="small" />
        }
        keyExtractor={(item): string => item.id}
        data={data}
        renderItem={({ item, index }): JSX.Element => {
          const { id, status } = item;
          return (
            <TouchableOpacity
              key={index + id}
              onPress={(): void | null =>
                (status && status === 'refusée') ||
                (status && status === 'terminée')
                  ? null
                  : openToDescription(id, status || '')
              }>
              <ListItemOffering key={index} offering={item} />
            </TouchableOpacity>
          );
        }}
      />
    </Block>
  );
};

export default CustomListView;
