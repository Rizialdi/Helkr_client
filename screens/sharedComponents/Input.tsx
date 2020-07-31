import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import * as Icon from '@expo/vector-icons';

import Text from './Text';
import Block from './Block';
import Button from './Button';
import { useStoreState } from '../../models';
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
          <Icon.Ionicons
            color={themeColors.gray}
            size={14 * 1.35}
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
    borderRadius: 6,
    fontSize: 14,
    fontWeight: '500',
    height: 16 * 2.5
  },
  toggle: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: 16 * 2,
    height: 16 * 2,
    top: 16,
    right: 0
  }
});

export default Input;
