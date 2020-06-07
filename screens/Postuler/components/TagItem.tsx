import React, { SFC } from 'react';
import { View, StyleSheet } from 'react-native';

import { Text } from '../../shareComponents';

interface Props {
  tag: string;
  category?;
  date?;
  type?;
}
const TagItem: SFC<Props> = ({ tag = '', category, date, type }) => {
  const blockStyles = [
    styles.container,
    category && {
      backgroundColor: 'rgba(175, 158, 123, 0.1)'
    },
    date && { backgroundColor: 'rgba(175, 100, 123, 0.1)' },
    type && { backgroundColor: 'rgba(50, 158, 123, 0.1)' }
  ];
  return (
    <View style={blockStyles}>
      <Text
        style={{
          fontFamily: 'HelveticaNeue',
          fontSize: 15,
          marginRight: 5
        }}
      >
        {tag}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    margin: 5
  }
});

export default TagItem;
