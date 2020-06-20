import React from 'react';
import { View } from 'react-native';

import { theme } from '../../../constants';
import { Text } from '../../shareComponents';

interface Props {
  tag?: string;
}

export default ({ tag }: Props) => (
  <View
    style={{
      alignItems: 'center',
      padding: 10,
      borderRadius: 5,
      margin: 5,
      backgroundColor: 'rgba(175, 158, 123, 0.1)'
    }}>
    {tag && (
      <Text
        style={{
          fontFamily: 'HelveticaNeue',
          fontSize: theme.sizes.body * 1.1,
          marginRight: 5
        }}>
        {tag}
      </Text>
    )}
  </View>
);
