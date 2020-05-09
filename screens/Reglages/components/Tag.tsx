import React from 'react';
import { View } from 'react-native';

import TagItem from './TagItem';

export default ({ tags = ['_'] }) => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: 20
    }}
  >
    {tags.map((item, key) => (
      <TagItem key={key} tag={item} />
    ))}
  </View>
);
