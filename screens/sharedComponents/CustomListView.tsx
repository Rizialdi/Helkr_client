import React, { SFC } from 'react';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Block from './Block';
import ListItemOffering from './ListItemOffering';
import Text from './Text';
import { theme } from '../../constants';
import { MainStackParamList } from '../../navigation/Routes';
import { StackNavigationProp } from '@react-navigation/stack';

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
  emptyMessage: string;
  modalToOpen: 'ManageCandidates' | 'ManageOffering' | 'Postulees' | 'Offres';
  refreshing: boolean;
  navigation: StackNavigationProp<MainStackParamList, 'DetailOffering'>;
}
const CustomListView: SFC<Props> = ({
  data,
  onRefresh,
  emptyMessage,
  refreshing,
  navigation,
  modalToOpen
}) => {
  const openToDescription = (id: string): void => {
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
          params: { id }
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
        onEndReached={(): void => console.log('Fin atteinte')}
        onEndReachedThreshold={0}
        pagingEnabled={true}
        alwaysBounceVertical={true}
        // ListFooterComponent={() => <ActivityIndicator size="small" />}
        keyExtractor={(item): string => item.id}
        data={data}
        renderItem={({ item, index }): JSX.Element => {
          const { id } = item;
          return (
            <TouchableOpacity
              key={index}
              onPress={(): void | null =>
                (item.status && item.status === 'refusée') ||
                (item.status && item.status === 'terminée')
                  ? null
                  : openToDescription(id)
              }>
              <ListItemOffering offering={item} />
            </TouchableOpacity>
          );
        }}
      />
    </Block>
  );
};

export default CustomListView;
