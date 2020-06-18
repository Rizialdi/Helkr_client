import React, { Component, FC } from "react";
import { StyleSheet, StyleProp, ViewStyle, Animated } from "react-native";

import Block, { BlockProps } from "./Block";
import { theme } from "../constants";

interface Props extends BlockProps {
  children: JSX.Element;
  style?: object;
  size?: number;
}

type Badge =
  | StyleProp<ViewStyle>
  | Animated.WithAnimatedValue<StyleProp<ViewStyle>>;

const Badge: FC<Props> = ({ children, style, size, ...props }) => {
  const badgeStyles: Badge = StyleSheet.flatten([
    styles.badge,
    size && {
      height: size,
      width: size,
      borderRadius: size,
    },
    style,
  ]);

  return (
    <Block flex={false} middle center white style={badgeStyles} {...props}>
      {children}
    </Block>
  );
};

const styles = StyleSheet.create({
  badge: {
    height: theme.sizes.base,
    width: theme.sizes.base,
    borderRadius: theme.sizes.border,
  },
});

export default Badge;
