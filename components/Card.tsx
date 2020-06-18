import React, { Component } from "react";
import { StyleSheet } from "react-native";

import Block, { BlockProps } from "./Block";
import { theme } from "../constants";

interface Props extends BlockProps {
  style?: object;
  children?: JSX.Element | JSX.Element[];
}

const Card: React.FC<Props> = ({ style, children, ...props }) => {
  const cardStyles = [styles.card, style];

  return (
    <Block white style={cardStyles} {...props}>
      {children}
    </Block>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.sizes.radius,
    padding: theme.sizes.base + 4,
    marginBottom: theme.sizes.base,
  },
});

export default Card;
