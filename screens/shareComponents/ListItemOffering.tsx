import React from 'react';
import { StyleSheet } from 'react-native';

import { formatDate } from '../../utils';
import Block from './Block';
import TagItem from './TagItem';
import Text from './Text';

export default ({ offering }) => {
  const { category, type, description, createdAt } = offering;
  return (
    <Block flex={false} style={styles.container}>
      {offering?.status && <TagItem tag={offering?.status} status />}
      <Block flex={false} row middle space={'around'}>
        <TagItem tag={type} type />
        <TagItem tag={category} category />
        <TagItem tag={formatDate(createdAt)} date />
        {console.log(createdAt)}
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
  delimiter: {
    borderTopColor: '#DFD8C8',
    borderTopWidth: 0.5,
    marginTop: 15,
    marginBottom: 15
  }
});