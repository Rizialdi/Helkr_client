import React from 'react';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

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
      backgroundColor: 'rgba(175, 158, 123, 0.1)',
      alignItems: 'center',
      paddingHorizontal: theme.sizes.hinouting * 0.4,
      paddingVertical: theme.sizes.inouting * 0.4,
      borderRadius: theme.sizes.radius,
      marginHorizontal: theme.sizes.hinouting / 5,
      marginVertical: theme.sizes.inouting / 5
    }}>
    {!!tag && (
      <Text
        style={{
          fontFamily: 'HelveticaNeue',
          fontSize: theme.sizes.body * 1.1,
          marginRight: theme.sizes.inouting / 5
        }}>
        {tag}
      </Text>
    )}
    <AntDesign name="close" size={15} color="black" />
  </View>
);
