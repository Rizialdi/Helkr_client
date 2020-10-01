import React, { SFC } from 'react';
import { Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { DetailOfferingParamsList } from '../../../navigation/Routes';
import { StackNavigationProp } from '@react-navigation/stack';

interface Props {
  route?: RouteProp<DetailOfferingParamsList, 'MyAppliedOfferingModal'>;
  navigation?: StackNavigationProp<
    DetailOfferingParamsList,
    'MyAppliedOfferingModal'
  >;
}
const MyAppliedOfferingMod: SFC<Props> = ({ route }) => {
  return (
    <>
      <Text>Applied {route?.params.id}</Text>
    </>
  );
};

export default MyAppliedOfferingMod;
