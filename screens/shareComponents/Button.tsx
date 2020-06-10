import React, { Component, SFC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useStoreState } from '../../models';
interface Props {
  style?;
  opacity?;
  gradient?;
  color?;
  shadow?;
  accent?;
  primary?;
  secondary?;
  tertiary?;
  black?;
  white?;
  gray?;
  vertical?;
  onPress?: () => void;
}

const Button: SFC<Props> = ({
  style,
  gradient,
  color,
  shadow,
  children,
  accent,
  primary,
  secondary,
  tertiary,
  black,
  white,
  gray,
  vertical,
  ...props
}) => {
  const { themeColors } = useStoreState((state) => state.Preferences);

  const startColor = themeColors.primary,
    endColor = themeColors.secondary,
    start = { x: 0, y: 0 },
    end = { x: 1, y: 1 },
    locations = [0.1, 0.9],
    opacity = 0.8;

  const buttonStyles = [
    styles.button,
    shadow &&
      styles.shadow && {
        shadowColor: themeColors.black
      },
    color && styles[color], // predefined styles colors for backgroundColor
    color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
    accent && { backgroundColor: themeColors.accent },
    primary && { backgroundColor: themeColors.primary },
    secondary && { backgroundColor: themeColors.secondary },
    tertiary && { backgroundColor: themeColors.tertiary },
    black && { backgroundColor: themeColors.black },
    white && { backgroundColor: themeColors.white },
    gray && { backgroundColor: themeColors.gray },
    style
  ];

  if (gradient) {
    return (
      <TouchableOpacity style={buttonStyles} activeOpacity={opacity} {...props}>
        <LinearGradient
          start={start}
          end={end}
          locations={locations}
          style={buttonStyles}
          colors={[startColor, endColor]}
        >
          {children}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={buttonStyles}
      activeOpacity={opacity || 0.8}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    height: 48,
    justifyContent: 'center',
    marginVertical: 8
  },
  shadow: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10
  }
});
