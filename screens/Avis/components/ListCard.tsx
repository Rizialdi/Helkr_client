import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { theme } from '../../../constants';
import { Text } from '../../sharedComponents';
import { formatDateAvis } from '../../../utils';
import ImageComponent from '../../sharedComponents/ImageComponent';

interface Mark {
  scorer: string;
  score: number;
  comment: string;
  createdAt: string;
  avatar: string | undefined;
}
const mark: string[] = [
  'A éviter',
  'Décevant',
  'Passable',
  'Bien',
  'Très bien',
  'Parfait'
];

export default ({
  scorer = 'John D.',
  score = 0,
  comment = 'Agreable',
  createdAt = Date.now().toString(),
  avatar = ''
}: Mark) => (
  <TouchableOpacity style={styles.container}>
    <View style={styles.mainLine}>
      <Text style={{ fontSize: 16, fontWeight: '500' }}>{scorer}</Text>

      <ImageComponent image={avatar} style={styles.image} />
    </View>

    <View style={{ marginHorizontal: 30 }}>
      <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 10 }}>
        {mark[score]}
      </Text>
      <Text style={{ fontSize: 14, marginBottom: 10 }}>{comment}</Text>
      <Text style={{ fontSize: 10 }}>{formatDateAvis(createdAt)}</Text>
    </View>
    <View style={styles.delimiter}></View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { width: '100%', marginTop: 10 },
  mainLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30
  },

  image: {
    height: 45,
    width: 45,
    borderRadius: 50,
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: theme.colors.primary
  },
  delimiter: {
    borderTopColor: '#DFD8C8',
    borderTopWidth: 0.5,
    marginTop: 15,
    marginBottom: 15
  }
});
