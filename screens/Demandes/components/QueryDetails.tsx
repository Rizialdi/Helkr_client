import { openURL } from 'expo-linking';
import React, { SFC } from 'react';
import { ScrollView, View } from 'react-native';

import { RouteProp } from '@react-navigation/native';

import { theme } from '../../../constants';
import { DemandesParamsList } from '../../../navigation/Routes';
import { capitalize, makePseudoName } from '../../../utils';
import {
  Block,
  Button,
  StackedToBottom,
  StatsContainer,
  Text
} from '../../sharedComponents';
import Item from './Item';

interface Props {
  route: RouteProp<DemandesParamsList, 'QueryDetails'>;
}
const QueryDetails: SFC<Props> = ({ route }) => {
  const {
    params: { item }
  } = route;
  return (
    <Block white>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Item
          queryDetail={true}
          image={item.sentBy?.avatar}
          messageDate={item.createdAt}
          address={capitalize(item.sentBy?.address || '') || ''}
          name={makePseudoName(
            item.sentBy?.nom || '',
            item.sentBy?.prenom || ''
          )}
        />
        <Text
          bold
          horizontal={20}
          size={16}
          vertical={[theme.sizes.htwiceTen, theme.sizes.htwiceTen / 2]}>
          Carte
        </Text>
        <StatsContainer
          id={item.sentById as string}
          offeringAuthorStars={true}
        />
        <Text
          bold
          horizontal={20}
          size={16}
          vertical={[theme.sizes.htwiceTen * 2, theme.sizes.htwiceTen / 2]}>
          Message
        </Text>
        <Text horizontal={20}>{item.message}</Text>
      </ScrollView>
      <Block margin={[0, theme.sizes.twiceTen * 1]}>
        <StackedToBottom>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <Button
              secondary
              style={{ width: theme.sizes.screenWidth / 2.3 }}
              onPress={() => openURL(`sms:${item.sentBy?.numero}`)}>
              <Text center bold>
                SMS
              </Text>
            </Button>
            <Button
              secondary
              style={{ width: theme.sizes.screenWidth / 2.3 }}
              onPress={() => openURL(`tel:${item.sentBy?.numero}`)}>
              <Text center bold>
                Appeler
              </Text>
            </Button>
          </View>
        </StackedToBottom>
      </Block>
    </Block>
  );
};

export default QueryDetails;
