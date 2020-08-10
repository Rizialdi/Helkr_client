import React, { SFC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useStoreState } from '../../models';
import { theme } from '../../constants';
interface Props {
  style?: object;
  opacity?: number;
  gradient?: boolean;
  shadow?: object;
  accent?: boolean;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  black?: boolean;
  white?: boolean;
  gray?: boolean;
  vertical?: boolean;
  onPress?: () => void;
  disabled?: boolean;
}

const Button: SFC<Props> = ({
  style,
  gradient,
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
  const { themeColors } = useStoreState(state => state.Preferences);

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
          colors={[startColor, endColor]}>
          {children}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={buttonStyles}
      activeOpacity={opacity || 0.8}
      {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    borderRadius: theme.sizes.border,
    height: theme.sizes.htwiceTen * 2.4,
    marginVertical: theme.sizes.hinouting * 0.3
  },
  shadow: {
    shadowOpacity: 0.1,
    shadowRadius: theme.sizes.radius * 1.6,
    shadowOffset: { width: 0, height: theme.sizes.radius / 3 }
  }
});
