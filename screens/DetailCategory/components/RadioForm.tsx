import React, { Component, SFC } from 'react';
import { View, Dimensions } from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';

import { Text } from '../../shareComponents';

import { useStoreState } from '../../../models';

interface Props {
  name: string;
  values?: { ItemLabel: string };
  isLast: boolean;
  radio_props?: Array<{ label: string; value: string }>;
  nextStep?: () => void;
  onSelected?: (a: boolean) => void;
  onChange?: (a: string, b: string) => void;
}

const CustomRadioForm: SFC<Props> = ({
  name,
  values,
  isLast,
  nextStep,
  onChange,
  onSelected,
  radio_props
}) => {
  values && values[name] && onSelected(true);

  const { themeColors } = useStoreState((state) => state.Preferences);
  return (
    <View style={{ marginTop: 20 }}>
      <Text center title light transform="capitalize">
        {name}
      </Text>
      <View style={{ marginTop: 20 }}>
        <RadioForm animation={true}>
          {/* To create radio buttons, loop through your array of options */}
          {radio_props.map((obj, i) => (
            <RadioButton labelHorizontal={true} key={i}>
              {/*  You can set RadioButtonLabel before RadioButtonInput */}
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={
                  values && values[name] && obj.value === values[name]
                }
                onPress={() => {
                  onSelected(true);
                  onChange(name, obj.value);
                  !isLast && setTimeout(() => nextStep(), 100);
                }}
                borderWidth={1}
                buttonInnerColor={themeColors.primary}
                buttonOuterColor={
                  values && values[name] && obj.value === values[name]
                    ? themeColors.primary
                    : themeColors.defaultTextColor
                }
                buttonSize={15}
                buttonOuterSize={20}
                buttonStyle={{ marginLeft: 10 }}
                buttonWrapStyle={{
                  marginTop: 20,
                  flex: 0.2,
                  borderBottomWidth: 1,
                  borderBottomColor: themeColors.gray2
                }}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={true}
                onPress={() => {
                  onSelected(true);
                  onChange(name, obj.value);
                  !isLast && setTimeout(() => nextStep(), 100);
                }}
                labelStyle={{
                  fontSize: 20,
                  color: themeColors.defaultTextColor
                }}
                labelWrapStyle={{
                  flex: 0.8,
                  borderBottomWidth: 1,
                  borderBottomColor: themeColors.gray2,
                  padding: 20,
                  paddingLeft: 0
                }}
              />
            </RadioButton>
          ))}
        </RadioForm>
      </View>
    </View>
  );
};

export default CustomRadioForm;
