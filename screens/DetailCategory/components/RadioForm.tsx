import React, { SFC } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
  //@ts-ignore
} from "react-native-simple-radio-button";

import { Text } from "../../shareComponents";

import { useStoreState } from "../../../models";

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
  radio_props,
}) => {
  values && values.name && onSelected && onSelected(true);
  values?.offeringDescription?.length
    ? onSelected && onSelected(true)
    : onSelected && onSelected(false);

  const { themeColors } = useStoreState((state) => state.Preferences);
  return (
    <View style={{ marginTop: 20 }}>
      <Text center title light transform="capitalize">
        {!isLast ? name : "Ajouter une description ?"}
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
                    borderBottomColor: themeColors.gray2,
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
                    color: themeColors.defaultTextColor,
                  }}
                  labelWrapStyle={{
                    flex: 0.8,
                    borderBottomWidth: 1,
                    borderBottomColor: themeColors.gray2,
                    padding: 20,
                    paddingLeft: 0,
                  }}
                />
              </RadioButton>
            ))}
          </RadioForm>
        ) : (
          <>
            <TextInput
              placeholder={"Ajouter un descriptif ?"}
              style={[styles.text, styles.subText2]}
              maxLength={200}
              multiline={true}
              value={
                values?.offeringDescription
                  ? JSON.stringify(values?.offeringDescription)
                  : ""
              }
              onChangeText={(text) =>
                onChange && onChange("offeringDescription", text)
              }
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },

  subText2: {
    fontSize: 14,
    color: "#AEB5BC",
    fontWeight: "500",
    textAlign: "justify",
    paddingHorizontal: 20,
    marginTop: 10,
  },
});

export default CustomRadioForm;
