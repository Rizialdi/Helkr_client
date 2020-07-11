// just copy this code from the driving repo :)
import React from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';

import { useStoreState } from '../../models';

import { theme } from '../../constants';

interface Props {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  title?: boolean;
  body?: boolean;
  children?:
    | string
    | number
    | JSX.Element
    | (string | JSX.Element | number | null)[];
  caption?: boolean;
  small?: boolean;
  size?: any;
  transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  align?: 'center' | 'auto' | 'left' | 'right' | 'justify';
  // styling
  regular?: boolean;
  bold?: boolean;
  semibold?: boolean;
  medium?: boolean;
  weight?: any;
  light?: boolean;
  center?: boolean;
  right?: boolean;
  spacing?: any; // letter-spacing
  height?: any;
  // colors
  accent?: boolean;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  black?: boolean;
  white?: boolean;
  gray?: boolean;
  gray2?: boolean;
  style?: object;
  /**
   Horizontal margin on a Text element*/
  horizontal?: any;
  vertical?: any;
}
const CustomText: React.FC<Props> = ({
  h1,
  h2,
  h3,
  title,
  body,
  caption,
  small,
  size,
  transform,
  align,
  // styling
  regular,
  bold,
  semibold,
  medium,
  weight,
  light,
  center,
  right,
  spacing, // letter-spacing
  height, // line-height
  horizontal,
  vertical,
  // colors
  accent,
  primary,
  secondary,
  tertiary,
  black,
  white,
  gray,
  gray2,
  style,
  children,
  ...props
}) => {
  const { themeColors } = useStoreState(state => state.Preferences);

  const handleVertical = () => {
    if (typeof vertical === 'number') {
      return {
        marginVertical: vertical,
        marginTop: 0,
        marginBottom: 0
      };
    }

    if (typeof vertical === 'object') {
      const verticalSize = Object.keys(vertical).length;
      switch (verticalSize) {
        case 1:
          return {
            marginTop: vertical[0],
            marginBottom: vertical[0],
            marginVertical: 0
          };
        default:
          return {
            marginTop: vertical[0],
            marginBottom: vertical[1],

            marginVertical: 0
          };
      }
    }
  };
  const textStyles: StyleProp<TextStyle> = [
    {
      color: themeColors.defaultTextColor
    },
    styles.text,
    h1 && styles.h1,
    h2 && styles.h2,
    h3 && styles.h3,
    title && styles.title,
    body && styles.body,
    caption && styles.caption,
    small && styles.small,
    align && { textAlign: align },
    transform && { textTransform: transform },
    size && { fontSize: size },
    horizontal && { marginHorizontal: horizontal },
    vertical && { ...handleVertical() },
    height && { lineHeight: height },
    spacing && { letterSpacing: spacing },
    weight && { fontWeight: weight },
    regular && styles.regular,
    bold && styles.bold,
    semibold && styles.semibold,
    medium && styles.medium,
    light && styles.light,
    center && styles.center,
    right && styles.right,
    // color shortcuts
    accent && {
      color: themeColors.accent
    },
    primary && {
      color: themeColors.primary
    },
    secondary && {
      color: themeColors.secondary
    },
    tertiary && {
      color: themeColors.tertiary
    },
    black && {
      color: themeColors.black
    },
    white && {
      color: themeColors.white
    },
    gray && {
      color: themeColors.gray
    },
    gray2 && {
      color: themeColors.gray2
    },
    style // rewrite predefined styles
  ];

  return (
    <Text style={textStyles} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  // default style
  text: {
    fontSize: theme.sizes.font
  },
  // variations
  regular: {
    fontWeight: 'normal'
  },
  bold: {
    fontWeight: 'bold'
  },
  semibold: {
    fontWeight: '500'
  },
  medium: {
    fontWeight: '500'
  },
  light: {
    fontWeight: '200'
  },
  // position
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  // fonts
  h1: theme.fonts.h1,
  h2: theme.fonts.h2,
  h3: theme.fonts.h3,
  title: theme.fonts.title,
  body: theme.fonts.body,
  caption: theme.fonts.caption,
  small: theme.fonts.small
});

export default CustomText;
