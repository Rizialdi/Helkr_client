import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Octicons } from '@expo/vector-icons';

import Text from './Text';
import { theme } from '../../constants';

interface Props {
  average?: number | null;
  done?: number | null;
}
export default ({ average, done }: Props) => (
  <View style={{ flexDirection: 'row' }}>
    <Octicons name="star" size={theme.sizes.twiceTen * 1.25} color="#52575D" />
    <Text
      style={[
        styles.text,
        { paddingLeft: theme.sizes.twiceTen, fontSize: theme.sizes.base * 1.2 }
      ]}>
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
