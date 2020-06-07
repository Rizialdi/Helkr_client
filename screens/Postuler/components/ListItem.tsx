import React from 'react';
import { StyleSheet, View } from 'react-native';

import { theme } from '../../../constants';
import { Text, Block } from '../../shareComponents';
import TagItem from './TagItem';

const formatDate = (timestamp: string = '15886987435') => {
  const date = new Date(parseInt(timestamp));
  return date.getMonth() + ' ' + date.getFullYear();
};
export default ({ offering }) => {
  const { category, type, description, createdAt } = offering;
  return (
    <Block flex={false} style={styles.container}>
      <Block flex={false} row middle space={'around'}>
        <TagItem tag={type} type />
        <TagItem tag={category} category />
        <TagItem tag={formatDate(createdAt)} date />
      </Block>
      <Text style={{ marginHorizontal: 30, marginVertical: 15 }}>
        {description}
      </Text>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
    marginVertical: 10,
    justifyContent: 'space-between',
    alignContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#000'
  },
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
