import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { theme } from '../../../constants';
import { Text } from '../../sharedComponents';

interface Props {
  tag?: string;
}

export default ({ tag }: Props) => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderRadius: 5,
      margin: 5,
      backgroundColor: 'rgba(175, 158, 123, 0.1)'
    }}>
    {!!tag && (
      <Text
        style={{
          fontFamily: 'HelveticaNeue',
          fontSize: theme.sizes.body * 1.1,
          marginRight: 5
        }}>
        {tag}
      </Text>
    )}
    <Icon name="close" size={15} color="black" />
  </View>
);
