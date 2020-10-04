import React, { FC, useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  StyleProp,
  ViewStyle,
  View
} from 'react-native';
import Text from './Text';
import { useStoreState } from '../../models';
import { theme } from '../../constants';
import { FieldError } from 'react-hook-form';
interface InputProps {
  min: number;
  max: number;
  placeholder: string;
  center?: boolean;
  left?: boolean;
  right?: boolean;
  shadow?: boolean;
  space?: 'between' | 'around' | 'evenly';
  margin?: number | number[];
  animated?: boolean;
  style?: object;
  padding?: number | number[];
  accent?: boolean;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  black?: boolean;
  white?: boolean;
  gray?: boolean;
  blurOnSubmit?: boolean;
  onChangeText?: (i: string) => void;
  onSubmitEditing?: () => void;
  value?: string;
  number?: boolean;
  error?: FieldError | undefined;
  name: string;
  returnKeyType?: string;
  label?: string;
  parentCallback?: React.Dispatch<React.SetStateAction<string>>;
}

export default React.forwardRef<unknown, InputProps>(
  (props, ref): React.ReactElement => {
    const {
      min,
      max,
      placeholder,
      center,
      left,
      right,
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
      style,
      children,
      number,
      error,
      label,
      parentCallback,
      ...Inputprops
    } = props;

    const [value, setValue] = useState<string>('');
    const [count, setCount] = useState<number>(0);
    const { themeColors } = useStoreState(state => state.Preferences);
    if (min >= max) return null;

    useEffect(() => {
      if (Inputprops.value) {
        setValue(Inputprops.value);
        setCount(Inputprops.value.length);
      }
    }, [Inputprops.value]);

    const blockStyles: StyleProp<ViewStyle> = [
      center && styles.center,
      left && styles.left,
      right && styles.right,
      shadow && styles.shadow && { shadowColor: themeColors.defaultTextColor },
      space && { justifyContent: `space-${space}` },
      accent && { backgroundColor: themeColors.accent },
      primary && { backgroundColor: themeColors.primary },
      secondary && { backgroundColor: themeColors.secondary },
      tertiary && { backgroundColor: themeColors.tertiary },
      black && { backgroundColor: themeColors.black },
      white && { backgroundColor: themeColors.white },
      gray && { backgroundColor: themeColors.gray },
      style // rewrite predefined styles
    ];

    const inputType = number ? 'numeric' : 'default';

    return (
      <>
        <Text
          bold
          size={theme.sizes.base}
          vertical={[theme.sizes.htwiceTen, theme.sizes.htwiceTen / 2]}>
          {label}
        </Text>
        <View style={[styles.container, blockStyles]}>
          <TextInput
            ref={ref}
            maxLength={max}
            multiline={true}
            placeholder={placeholder}
            keyboardType={inputType}
            {...Inputprops}
            onChangeText={(itemValue): void => {
              setCount(itemValue.length);
              Inputprops.onChangeText && Inputprops.onChangeText(itemValue);
              parentCallback && parentCallback(value);
            }}
            style={[
              styles.input,
              { height: max <= 70 ? 70 : (max * 20) / 35 },
              blockStyles
            ]}
          />
          <Text
            semibold
            small
            right
            horizontal={theme.sizes.inouting / 5}
            vertical={theme.sizes.hinouting / 5}>
            {count} / {max}
          </Text>
        </View>
        <Text style={styles.textError}>{error && error.message}</Text>
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.sizes.border,
    backgroundColor: '#f4f9fa'
  },
  input: {
    paddingHorizontal: theme.sizes.inouting * 0.4,
    paddingVertical: theme.sizes.hinouting * 0.4,
    overflow: 'hidden'
  },
  center: {
    textAlign: 'center'
  },
  left: {
    textAlign: 'left'
  },
  right: {
    textAlign: 'right'
  },
  shadow: {
    shadowOffset: { width: 0, height: theme.sizes.base / 8 },
    shadowOpacity: StyleSheet.hairlineWidth,
    shadowRadius: theme.sizes.radius * 2,
    elevation: 2
  },
  textError: {
    color: '#fc6d47',
    fontSize: 14
  }
});
