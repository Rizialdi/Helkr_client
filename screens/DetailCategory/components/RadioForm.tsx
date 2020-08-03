import React, { SFC, useState, useEffect } from 'react';
import { View } from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
  //@ts-ignore
} from 'react-native-simple-radio-button';

import { Text, TextAreaInput } from '../../sharedComponents';

import { useStoreState } from '../../../models';
import Block from '../../sharedComponents/Block';

type valuesInterface = {
  name: string;
  offeringDescription?: Array<object> | undefined;
};

interface Props {
  name: string;
  values?: valuesInterface;
  isLast?: boolean;
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
  values && values.name && onSelected && onSelected(true);
  values?.offeringDescription?.length
    ? onSelected && onSelected(true)
    : onSelected && onSelected(false);

  const { themeColors } = useStoreState(state => state.Preferences);

  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    onChange && onChange('offeringDescription', description);
  }, [description]);
  return (
    <View style={{ marginTop: 20 }}>
      <Text center bold>
        {!isLast ? name : 'Ajouter une description.'}
      </Text>
      <View style={{ marginTop: 20 }}>
        {!isLast ? (
          <RadioForm animation={true}>
            {/* To create radio buttons, loop through your array of options */}
            {radio_props?.map((obj, i) => (
              <RadioButton labelHorizontal={true} key={i}>
                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={
                    values && values.name && obj.value === values.name
                  }
                  onPress={() => {
                    onSelected && onSelected(true);
                    onChange && onChange(name, obj.value);
                    setTimeout(() => nextStep && nextStep(), 100);
                  }}
                  borderWidth={1}
                  buttonInnerColor={themeColors.primary}
                  buttonOuterColor={
                    values && values.name && obj.value === values.name
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
                    onSelected && onSelected(true);
                    onChange && onChange(name, obj.value);
                    setTimeout(() => nextStep && nextStep(), 100);
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
        ) : (
          <Block margin={[0, 15]}>
            <TextAreaInput
              min={20}
              max={200}
              parentCallback={setDescription}
              placeholder={'Decrivez votre mission içi.'}
            />
          </Block>
        )}
      </View>
    </View>
  );
};

export default CustomRadioForm;
