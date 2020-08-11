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
interface Props {
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
  value?: string;
  parentCallback?: React.Dispatch<React.SetStateAction<string>>;
}

const TextAreaInput: FC<Props> = ({
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
  parentCallback,
  ...props
}) => {
  const [value, setValue] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  const { themeColors } = useStoreState(state => state.Preferences);
  if (min >= max) return null;

  useEffect(() => {
    if (props.value) {
      setValue(props.value);
      setCount(props.value.length);
    }
  }, []);

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

  return (
    <View style={[styles.container, blockStyles]}>
      <TextInput
        maxLength={max}
        multiline={true}
        value={value}
        placeholder={placeholder}
        onChangeText={value => {
          setValue(value), setCount(value.length);
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
  );
};

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
  }
});
export default TextAreaInput;
