import React from 'react';
import { StyleSheet } from 'react-native';

import Block, { BlockProps } from './Block';
import { useStoreState } from '../../models';
import { theme } from '../../constants';

interface Props extends BlockProps {
  style?: object;
  children?: JSX.Element | JSX.Element[];
  shadow?: boolean;
}

const Card: React.FC<Props> = ({ style, shadow, children, ...props }) => {
  const { themeColors } = useStoreState(state => state.Preferences);

  const cardStyles = [
    styles.card,
    style,
    shadow && styles.shadow,
    !props.primary &&
      !props.secondary && {
        backgroundColor: themeColors.white
      }
  ];

  return (
    <Block style={cardStyles} {...props}>
      {children}
    </Block>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.sizes.radius * 1.6,
    paddingVertical: theme.sizes.hinouting * 0.8,
    marginBottom: theme.sizes.hinouting / 5,
    marginHorizontal: theme.sizes.inouting / 5
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: theme.sizes.hinouting / 5
    },
    shadowOpacity: 0.1,
    shadowRadius: theme.sizes.radius * 8.4,
    elevation: theme.sizes.twiceTen * 1.2
  }
});

export default Card;
