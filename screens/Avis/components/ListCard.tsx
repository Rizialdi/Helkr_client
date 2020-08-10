import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text, Block } from '../../sharedComponents';
import { formatDateAvis } from '../../../utils';
import ImageComponent from '../../sharedComponents/ImageComponent';
import { theme } from '../../../constants';
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
      <View>
        <Text medium style={{ fontSize: theme.sizes.header }}>
          {scorer}
        </Text>
        <Text
          medium
          style={{
            fontSize: theme.sizes.header,
            marginBottom: theme.sizes.htwiceTen / 2
          }}>
          {mark[score]}
        </Text>
        <Text
          style={{
            fontSize: theme.sizes.body,
            marginBottom: theme.sizes.htwiceTen / 2
          }}>
          {comment}
        </Text>
        {createdAt && formatDateAvis(createdAt) && (
          <Text style={{ fontSize: theme.sizes.small }}>
            {formatDateAvis(createdAt)}
          </Text>
        )}
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
  container: { marginHorizontal: theme.sizes.base * 1.9 },
  image: {
    height: theme.sizes.htwiceTen * 2.75,
    width: theme.sizes.twiceTen * 2.75,
    borderRadius: theme.sizes.radius * 15,
    borderWidth: theme.sizes.border / 4,
    overflow: 'hidden'
  },
  delimiter: {
    borderTopColor: '#DFD8C8',
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: theme.sizes.htwiceTen * 0.75,
    marginBottom: theme.sizes.twiceTen * 0.75
  }
});
