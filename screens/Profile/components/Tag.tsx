import React from 'react';
import { StyleSheet, View } from 'react-native';

import { theme } from '../../../constants';
import { getItemNameOnReferenceId } from '../../../constants/mocks';
import TagItem from './TagItem';

interface Props {
  tags?: string[];
}

export default ({ tags }: Props) => (
  <View style={styles.tags}>
    {tags?.map((item, key) => (
      <TagItem key={key} tag={getItemNameOnReferenceId(item)} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  tags: {
    marginTop: theme.sizes.hinouting * 0.4,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: theme.sizes.inouting * 0.8
  }
});
