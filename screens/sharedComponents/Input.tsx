import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Text from './Text';
import Block from './Block';
import Button from './Button';
import { useStoreState } from '../../models';
import { theme } from '../../constants';
interface Props extends TextInputProps {
  email?: boolean;
  phone?: boolean;
  number?: boolean;
  secure?: boolean;
  label?: string;
  rightStyle?: object;
  onRightPress?: () => void;
  rightLabel?: JSX.Element;
  error?: boolean;
  style?: object;
}

const Input: React.FC<Props> = ({
  email,
  phone,
  number,
  secure,
  label,
  rightStyle,
  onRightPress,
  rightLabel,
  error,
  style,
  ...props
}) => {
  const { themeColors } = useStoreState(state => state.Preferences);
  const [toggleSecure, setToggleSecure] = useState<boolean>(false);

  useEffect(() => {
    setToggleSecure(false);
  }, []);

  const renderLabel = () => {
    return (
      <Block flex={false}>
        {label ? (
          <Text gray2={!error} accent={error}>
            {label}
          </Text>
        ) : null}
      </Block>
    );
  };

  const renderToggle = () => {
    if (!secure) return null;

    return (
      <Button
        style={styles.toggle}
        onPress={() => setToggleSecure(!toggleSecure)}>
        {rightLabel ? (
          rightLabel
        ) : (
          <Ionicons
            color={themeColors.gray}
            size={theme.sizes.font * 1.35}
            name={!toggleSecure ? 'md-eye' : 'md-eye-off'}
          />
        )}
      </Button>
    );
  };

  const renderRight = () => {
    if (!rightLabel) return null;

    return (
      <Button
        style={[styles.toggle, rightStyle]}
        onPress={() => onRightPress && onRightPress()}>
        {rightLabel}
      </Button>
    );
  };

  const isSecure = toggleSecure ? false : secure;

  const inputStyles = [
    styles.input,
    { borderColor: themeColors.black, color: themeColors.black },
    error && { borderColor: themeColors.accent },
    style
  ];

  const inputType = email
    ? 'email-address'
    : number
    ? 'numeric'
    : phone
    ? 'phone-pad'
    : 'default';

  return (
    <Block flex={false} margin={[16, 0]}>
      {renderLabel()}
      <TextInput
        style={inputStyles}
        secureTextEntry={isSecure}
        autoCapitalize="words"
        autoCorrect={false}
        keyboardType={inputType}
        {...props}
      />
      {renderToggle()}
      {renderRight()}
    </Block>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.radius,
    fontSize: theme.sizes.font,
    fontWeight: '500',
    height: theme.sizes.hbase * 2.5
  },
  toggle: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: theme.sizes.base * 2,
    height: theme.sizes.hbase * 2,
    top: theme.sizes.hbase,
    right: 0
  }
});

export default Input;
