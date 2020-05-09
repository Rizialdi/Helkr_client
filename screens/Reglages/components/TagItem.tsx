import React from 'react';
import { theme } from '../../../constants';
import { StyleSheet, Text, View } from 'react-native';

export default ({ tag = '' }) => (
  <View
    style={{
      padding: 10,
      borderRadius: 5,
      margin: 5,
      backgroundColor: 'rgba(175, 158, 123, 0.1)'
    }}
  >
    <Text
      style={{
        fontFamily: 'HelveticaNeue',
        fontSize: theme.sizes.body * 1.1
      }}
    >
      {tag}
    </Text>
  </View>
);
