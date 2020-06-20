import React from 'react';
import { StyleSheet, View } from 'react-native';

import TagItem from './TagItem';

interface Props {
  tags?: string[];
}

export default ({ tags }: Props) => (
  <View style={styles.tags}>
    {tags?.map((item, key) => (
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
