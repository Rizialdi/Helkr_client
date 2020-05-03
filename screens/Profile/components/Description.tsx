import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../constants';
export default ({ description }) => (
  <View style={[styles.description]}>
    <Text
      style={[
        styles.text,
        { fontWeight: '300', fontSize: 24, paddingLeft: 20 }
      ]}
    >
      Description
    </Text>
    <Text style={[styles.text, styles.subText2]}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  description: {
    marginTop: 10
  },
  text: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D'
  },

  subText2: {
    fontSize: theme.sizes.body,
    color: '#AEB5BC',
    fontWeight: '500',
    textAlign: 'justify',
    paddingHorizontal: 20,
    marginTop: 10
  }
});
