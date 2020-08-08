import React from 'react';
import { StyleSheet } from 'react-native';

import Block, { BlockProps } from './Block';
import { useStoreState } from '../../models';

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
    borderRadius: 10,
    paddingVertical: 16 + 4,
    marginBottom: 5,
    marginHorizontal: 5
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.1,
    shadowRadius: 50.0,
    elevation: 24
  }
});

export default Card;
