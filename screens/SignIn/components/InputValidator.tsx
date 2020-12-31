import React, { useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { theme } from '../../../constants';
import { useStoreState } from '../../../models';
import Block from '../../sharedComponents/Block';
import Button from '../../sharedComponents/Button';
import Text from '../../sharedComponents/Text';

interface Props extends TextInputProps {
  name: string;
  email?: boolean;
  phone?: boolean;
  number?: boolean;
  secure?: boolean;
  label?: string;
  error?: FieldError | undefined;
  style?: object;
}

export default React.forwardRef<unknown, Props>(
  (props, ref): React.ReactElement => {
    const {
      email,
      phone,
      number,
      secure,
      label,
      error,
      style,
      ...Inputprops
    } = props;
    const { themeColors } = useStoreState(state => state.Preferences);
    const [toggleSecure, setToggleSecure] = useState<boolean>(false);

    useEffect(() => {
      setToggleSecure(false);
    }, []);

    const renderLabel = () => {
      return (
        <Block flex={false}>
          {label ? (
            <Text gray2={!error} accent={!!error}>
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
          <Ionicons
            color={themeColors.gray}
            size={theme.sizes.font * 1.35}
            name={!toggleSecure ? 'md-eye' : 'md-eye-off'}
          />
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
          //@ts-ignore
          ref={ref}
          style={inputStyles}
          secureTextEntry={isSecure}
          autoCapitalize="words"
          autoCorrect={false}
          keyboardType={inputType}
          {...Inputprops}
        />
        {renderToggle()}
        <Text style={styles.textError}>{error && error.message}</Text>
      </Block>
    );
  }
);

const styles = StyleSheet.create({
  input: {
    fontSize: theme.sizes.font,
    fontWeight: '500',
    height: theme.sizes.hbase * 2.5,
    borderRadius: 0,
    borderWidth: 0,
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  toggle: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: theme.sizes.base * 2,
    height: theme.sizes.hbase * 2,
    top: theme.sizes.hbase,
    right: 0
  },
  textError: {
    color: '#fc6d47',
    fontSize: 14
  }
});
