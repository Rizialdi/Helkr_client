import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../constants';

import Icon from 'react-native-vector-icons/Octicons';

export default ({ average, done }) => (
  <View style={{ flexDirection: 'row' }}>
    <Icon name="star" size={25} color="#52575D" />
    <Text
      style={[
        styles.text,
        { paddingLeft: 20, fontSize: theme.sizes.base * 1.2 }
      ]}
    >
      {`${average}/5 - ${done} avis`}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D'
  }
});
