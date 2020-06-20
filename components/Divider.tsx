import React from 'react';
import { StyleSheet } from 'react-native';

import Block from './Block';
import { theme } from '../constants';

interface Props {
  style?: object;
}

const Divider: React.FC<Props> = ({ style, ...props }) => {
  const dividerStyles = [styles.divider, style];
  return <Block gray style={dividerStyles} {...props} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 0,
    margin: theme.sizes.base * 2,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});

export default Divider;
