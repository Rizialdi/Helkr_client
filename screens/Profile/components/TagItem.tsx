import React from 'react';
import { View } from 'react-native';

import { theme } from '../../../constants';
import { Text } from '../../sharedComponents';

interface Props {
  tag?: string;
}

export default ({ tag }: Props) => {
  return (
    <>
      {tag ? (
        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: theme.sizes.hinouting * 0.8,
            paddingVertical: theme.sizes.inouting * 0.8,
            borderRadius: theme.sizes.radius,
            marginHorizontal: theme.sizes.hinouting / 5,
            marginVertical: theme.sizes.inouting / 5,
            backgroundColor: 'rgba(175, 158, 123, 0.1)'
          }}>
          {tag && (
            <Text
              style={{
                fontFamily: 'HelveticaNeue',
                fontSize: theme.sizes.body * 1.1,
                marginRight: theme.sizes.inouting / 5
              }}>
              {tag}
            </Text>
          )}
        </View>
      ) : (
        <Text>_</Text>
      )}
    </>
  );
};
