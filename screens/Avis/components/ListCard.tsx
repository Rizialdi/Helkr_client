import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text, Block } from '../../sharedComponents';
import { formatDateAvis } from '../../../utils';
import ImageComponent from '../../sharedComponents/ImageComponent';

interface Mark {
  scorer: string;
  score: number;
  comment: string;
  createdAt: string;
  avatar: string | undefined;
  color: string;
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
  avatar = '',
  color
}: Mark) => (
  <>
    <Block style={styles.container} row space="between">
      <View style={{}}>
        <Text style={{ fontSize: 16, fontWeight: '500' }}>{scorer}</Text>
        <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 10 }}>
          {mark[score]}
        </Text>
        <Text style={{ fontSize: 14, marginBottom: 10 }}>{comment}</Text>
        <Text style={{ fontSize: 10 }}>{formatDateAvis(createdAt)}</Text>
      </View>
      <View>
        <ImageComponent
          image={avatar}
          style={[styles.image, { borderColor: color }]}
        />
      </View>
    </Block>
    <View style={styles.delimiter}></View>
  </>
);

const styles = StyleSheet.create({
  container: { marginHorizontal: 30 },
  image: {
    height: 55,
    width: 55,
    borderRadius: 50,
    borderWidth: 2,
    overflow: 'hidden'
  },
  delimiter: {
    borderTopColor: '#DFD8C8',
    borderTopWidth: 0.5,
    marginTop: 15,
    marginBottom: 15
  }
});
