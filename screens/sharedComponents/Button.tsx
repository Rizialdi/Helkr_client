import React, { SFC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { theme } from '../../constants';
import { useStoreState } from '../../models';

interface Props {
  style?: object;
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

  return (
    <TouchableOpacity style={buttonStyles} activeOpacity={0.8} {...props}>
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
