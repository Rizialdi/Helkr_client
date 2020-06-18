import React, { SFC } from "react";
import { StyleSheet, View, Animated, StyleProp, ViewStyle } from "react-native";
import { useStoreState } from "../models";

export interface BlockProps {
  flex?: boolean;
  row?: boolean;
  column?: object;
  center?: boolean;
  middle?: boolean;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  card?: boolean;
  shadow?: boolean;
  space?: "between" | "around" | "evenly";
  margin?: number | number[];
  animated?: boolean;
  wrap?: boolean;
  style?: object;
  padding?: number | number[];
  accent?: boolean;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  black?: boolean;
  white?: boolean;
  gray?: boolean;
}

const Block: SFC<BlockProps> = ({
  flex,
  row,
  column,
  center,
  middle,
  left,
  right,
  top,
  bottom,
  card,
  shadow,
  accent,
  primary,
  secondary,
  tertiary,
  black,
  white,
  gray,
  space,
  padding,
  margin,
  animated,
  wrap,
  style,
  children,
  ...props
}) => {
  const { themeColors } = useStoreState((state) => state.Preferences);

  const handleMargins = () => {
    if (typeof margin === "number") {
      return {
        marginTop: margin,
        marginRight: margin,
        marginBottom: margin,
        marginLeft: margin,
      };
    }

    if (typeof margin === "object") {
      const marginSize = Object.keys(margin).length;
      switch (marginSize) {
        case 1:
          return {
            marginTop: margin[0],
            marginRight: margin[0],
            marginBottom: margin[0],
            marginLeft: margin[0],
          };
        case 2:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[0],
            marginLeft: margin[1],
          };
        case 3:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[1],
          };
        default:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[3],
          };
      }
    }
  };

  const handlePaddings = () => {
    if (typeof padding === "number") {
      return {
        paddingTop: padding,
        paddingRight: padding,
        paddingBottom: padding,
        paddingLeft: padding,
      };
    }

    if (typeof padding === "object") {
      const paddingSize = Object.keys(padding).length;
      switch (paddingSize) {
        case 1:
          return {
            paddingTop: padding[0],
            paddingRight: padding[0],
            paddingBottom: padding[0],
            paddingLeft: padding[0],
          };
        case 2:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[0],
            paddingLeft: padding[1],
          };
        case 3:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[1],
          };
        default:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[3],
          };
      }
    }
  };

  const blockStyles:
    | StyleProp<ViewStyle>
    | Animated.WithAnimatedValue<StyleProp<ViewStyle>> = [
    styles.block,
    flex && { flex },
    flex === false && { flex: 0 }, // reset / disable flex
    row && styles.row,
    column && styles.column,
    center && styles.center,
    middle && styles.middle,
    left && styles.left,
    right && styles.right,
    top && styles.top,
    bottom && styles.bottom,
    margin && { ...handleMargins() },
    padding && { ...handlePaddings() },
    card && styles.card,
    shadow && styles.shadow && { shadowColor: themeColors.defaultTextColor },
    space && { justifyContent: `space-${space}` },
    wrap && { flexWrap: "wrap" },
    accent && { backgroundColor: themeColors.accent },
    primary && { backgroundColor: themeColors.primary },
    secondary && { backgroundColor: themeColors.secondary },
    tertiary && { backgroundColor: themeColors.tertiary },
    black && { backgroundColor: themeColors.black },
    white && { backgroundColor: themeColors.white },
    gray && { backgroundColor: themeColors.gray },
    style, // rewrite predefined styles
  ];

  if (animated) {
    return (
      <Animated.View style={blockStyles} {...props}>
        {children}
      </Animated.View>
    );
  }

  return (
    <View style={blockStyles} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  card: {
    borderRadius: 6,
  },
  center: {
    alignItems: "center",
  },
  middle: {
    justifyContent: "center",
  },
  left: {
    justifyContent: "flex-start",
  },
  right: {
    justifyContent: "flex-end",
  },
  top: {
    justifyContent: "flex-start",
  },
  bottom: {
    justifyContent: "flex-end",
  },
  shadow: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 13,
    elevation: 2,
  },
});

export default Block;
