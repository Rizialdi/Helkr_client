import React from 'react';
import { theme } from '../../../constants';
import { StyleSheet, Text, View } from 'react-native';

export default ({ tags }) => (
  <>
    <Text style={[styles.text, styles.subText2]}>{tags}</Text>
  </>
);

const styles = StyleSheet.create({
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
