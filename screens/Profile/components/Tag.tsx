import React from 'react';
import { theme } from '../../../constants';
import { StyleSheet, Text, View } from 'react-native';

import TagItem from './TagItem';

export default ({ tags = ['_'] }) => (
  <View style={styles.tags}>
    {tags.map((item, key) => (
      <TagItem key={key} tag={item} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  tags: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20
  }
});
