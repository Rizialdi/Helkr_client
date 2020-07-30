import React, { Component, FC } from 'react';
import { StyleSheet, StyleProp, ViewStyle, Animated } from 'react-native';

import Block, { BlockProps } from './Block';
import { useStoreState } from '../../models';

interface Props extends BlockProps {
  children: JSX.Element;
  style?: object;
  size?: number;
}

type Badge =
  | StyleProp<ViewStyle>
  | Animated.WithAnimatedValue<StyleProp<ViewStyle>>;

const Badge: FC<Props> = ({ children, style, size, ...props }) => {
  const { themeColors } = useStoreState(state => state.Preferences);

  const badgeStyles: Badge = StyleSheet.flatten([
    styles.badge,
    size && {
      height: size,
      width: size,
      borderRadius: size
    },
    style
  ]);

  return (
    <Block flex={false} middle center style={badgeStyles} {...props}>
      {children}
    </Block>
  );
};

const styles = StyleSheet.create({
  badge: {
    height: 16,
    width: 16,
    borderRadius: 5
  }
});

export default Badge;
