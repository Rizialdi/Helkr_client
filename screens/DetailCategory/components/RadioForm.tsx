import React, { Component } from 'react';
import { View } from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';

import { Text } from '../../shareComponents';
interface Props {
  radio_props: Array<{ label: string; value: string }>;
  name: string;
  onChange: (a: string, b: string) => void;
  values: { ItemLabel: string };
  onSelected: (a: boolean) => void;
}

export default class CustomRadioForm extends Component<Props> {
  render() {
    const { radio_props, onChange, values, name, onSelected } = this.props;
    values && values[name] && onSelected(true);
    return (
      <View>
        <Text center semibold transform="capitalize">
          {name}
        </Text>
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
                }}
                borderWidth={1}
                buttonInnerColor={'#e74c3c'}
                buttonOuterColor={
                  values && values[name] && obj.value === values[name]
                    ? '#2196f3'
                    : '#000'
                }
                buttonSize={40}
                buttonOuterSize={80}
                buttonStyle={{}}
                buttonWrapStyle={{ marginLeft: 10 }}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={true}
                onPress={() => {
                  onSelected(true);
                  onChange(name, obj.value);
                }}
                labelStyle={{ fontSize: 20, color: '#2ecc71' }}
                labelWrapStyle={{}}
              />
            </RadioButton>
          ))}
        </RadioForm>
      </View>
    );
  }
}
