import React, { SFC } from 'react';
import { Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { DetailOfferingParamsList } from '../../../navigation/Routes';
import { StackNavigationProp } from '@react-navigation/stack';

interface Props {
  route?: RouteProp<DetailOfferingParamsList, 'MyOfferingsModal'>;
  navigation?: StackNavigationProp<
    DetailOfferingParamsList,
    'MyOfferingsModal'
  >;
}
const MyCandidatesToOffering: SFC<Props> = ({ route }) => {
  return (
    <>
      <Text>Je suis ce que tu veux {route?.params.id}</Text>
    </>
  );
};

export default MyCandidatesToOffering;
