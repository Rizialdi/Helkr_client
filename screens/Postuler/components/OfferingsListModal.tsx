import React, { SFC } from 'react';
import { Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { DetailOfferingParamsList } from '../../../navigation/Routes';
import { StackNavigationProp } from '@react-navigation/stack';

interface Props {
  route?: RouteProp<DetailOfferingParamsList, 'OfferingsListModal'>;
  navigation?: StackNavigationProp<
    DetailOfferingParamsList,
    'OfferingsListModal'
  >;
}
const OfferingsListModal: SFC<Props> = ({ route }) => {
  return (
    <>
      <Text>Offering list {route?.params.id}</Text>
    </>
  );
};

export default OfferingsListModal;
