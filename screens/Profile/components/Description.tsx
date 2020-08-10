import React from 'react';
import { StyleSheet, View } from 'react-native';

import { theme } from '../../../constants';
import { Text } from '../../sharedComponents';

interface Props {
  description: string | null | undefined;
}

export default ({ description }: Props) => (
  <View style={[styles.description]}>
    <Text
      medium
      style={[
        styles.text,
        {
          fontSize: theme.sizes.twiceTen * 1.2,
          paddingLeft: theme.sizes.inouting * 0.8
        }
      ]}>
      Description
    </Text>
    <Text style={[styles.text, styles.subText2]}>{description || '_'}</Text>
  </View>
);

const styles = StyleSheet.create({
  description: {
    marginTop: theme.sizes.hinouting * 0.4
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
    paddingHorizontal: theme.sizes.inouting * 0.8,
    marginTop: theme.sizes.hinouting * 0.4
  }
});
