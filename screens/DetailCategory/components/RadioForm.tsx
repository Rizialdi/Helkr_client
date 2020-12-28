import React, { SFC, useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard, ActivityIndicator } from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
  //@ts-ignore
} from 'react-native-simple-radio-button';

import { Button, ModalItemInfos } from '../../sharedComponents';

import { Text, TextAreaInput, Block } from '../../sharedComponents';
import { useStoreState } from '../../../models';
import { theme } from '../../../constants';
import { ExecutionResult } from 'react-apollo';
import { StackNavigationProp } from '@react-navigation/stack';
import { DetailStackParamsList } from '../../../navigation/Routes';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type valuesInterface = {
  [name: string]: string;
};

interface Props {
  name: string;
  values?: valuesInterface;
  isLast?: boolean;
  radioProps?: { label: string; value: string }[];
  nextStep?: () => void;
  onSelected?: (a: boolean) => void;
  onChange?: (a: string, b: string) => void;
  onSubmit?: () => Promise<ExecutionResult<any>>;
  navigation?: StackNavigationProp<DetailStackParamsList>;
}

const CustomRadioForm: SFC<Props> = ({
  name,
  values,
  isLast,
  nextStep,
  onChange,
  onSelected,
  navigation,
  radioProps,
  onSubmit
}) => {
  values && values[name] && onSelected && onSelected(true);
  values?.offeringDescription?.length
    ? onSelected && onSelected(true)
    : onSelected && onSelected(false);

  const { themeColors } = useStoreState(state => state.Preferences);
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);
  const [description, setDescription] = useState<string>('');

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [submitPressed, setSubmitPressed] = useState<boolean>(false);
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmitForm = () => {
    Keyboard.dismiss();

    onSubmit &&
      onSubmit()
        .then(({ data, errors }) => {
          const {
            addOffering: { message, status }
          } = data;

          status && !message && setOpenModal(true);
          !status && message && setErrorMessage(message);
          errors &&
            setErrorMessage(
              "Une erreur s'est produite lors de la création de la mission. Veuillez réessayer plus tard."
            );
          (errors || (!status && message)) && setOpenErrorModal(true);
        })
        .catch(error => {
          error && setOpenErrorModal(true);
          throw new Error(`Ajout offre impossible, ${error}`);
        });
  };

  useEffect(() => {
    onChange && onChange('offeringDescription', description);
  }, [description]);

  return (
    <View
      style={{
        marginTop: theme.sizes.htwiceTen,
        backgroundColor: themeColors.background,
        height: '100%'
      }}>
      <Text
        h2
        transform={'capitalize'}
        horizontal={theme.sizes.twiceTen * 1.75}>
        {!isLast ? name : 'Description'}
      </Text>
      <View style={{ marginTop: theme.sizes.htwiceTen }}>
        {!isLast ? (
          <RadioForm animation={true}>
            {/* To create radio buttons, loop through your array of options */}
            {radioProps?.map((obj, i) => (
              <RadioButton labelHorizontal={true} key={i}>
                {/*  You can set RadioButtonLabel before RadioButtonInput */}

                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={
                    values && values[name] && obj.value === values[name]
                  }
                  onPress={() => {
                    onSelected && onSelected(true);
                    onChange && onChange(name, obj.value);
                    setTimeout(() => nextStep && nextStep(), 100);
                  }}
                  borderWidth={1}
                  buttonInnerColor={themeColors.secondary}
                  buttonOuterColor={
                    values && values[name] && obj.value === values[name]
                      ? themeColors.secondary
                      : themeColors.defaultTextColor
                  }
                  buttonSize={theme.sizes.base * 0.7}
                  buttonOuterSize={theme.sizes.base * 1}
                  buttonStyle={{}}
                  buttonWrapStyle={{
                    marginTop: theme.sizes.htwiceTen,
                    flex: 0.2,
                    borderBottomWidth: StyleSheet.hairlineWidth,
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
                    setTimeout(() => nextStep && nextStep(), 200);
                  }}
                  labelStyle={{
                    textTransform: 'capitalize',
                    fontSize: theme.sizes.h3,
                    color: themeColors.defaultTextColor
                  }}
                  labelWrapStyle={{
                    flex: 0.8,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: themeColors.gray2,
                    paddingVertical: theme.sizes.twiceTen
                  }}
                />
              </RadioButton>
            ))}
          </RadioForm>
        ) : (
          <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={{
                  height: '95%',
                  paddingBottom: theme.sizes.hinouting * 1.4
                }}>
                <Block margin={[0, theme.sizes.base * 1]}>
                  <TextAreaInput
                    min={20}
                    max={200}
                    parentCallback={setDescription}
                    placeholder={'Decrivez votre mission içi.'}
                  />
                </Block>

                <Block
                  margin={[0, theme.sizes.twiceTen]}
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end'
                  }}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      !!description && onSubmitForm();
                      !!description && setSubmitPressed(true);
                    }}>
                    <Button
                      disabled={!netWorkStatus || submitPressed}
                      secondary={netWorkStatus && !!description}
                      onPress={() => {
                        !!description && onSubmitForm();
                        !!description && setSubmitPressed(true);
                      }}>
                      {submitPressed ? (
                        <ActivityIndicator size={'small'} />
                      ) : (
                        <Text center bold>
                          Soumettre
                        </Text>
                      )}
                    </Button>
                  </TouchableWithoutFeedback>
                </Block>
              </View>
            </TouchableWithoutFeedback>

            {openModal && navigation && (
              <ModalItemInfos
                information={'Votre mission'}
                description={
                  "Votre mission vient d'être ajouté à notre liste. Vous serez sous peu contacté par des prestataires prêt à vous aider."
                }
                timer={0.5}
                callBack={navigation.goBack}
              />
            )}

            {openErrorModal && navigation && (
              <ModalItemInfos
                errorReporting
                information={'Erreur'}
                description={
                  errorMessage ||
                  "Une erreur s'est produite lors de la création de la mission. Veuillez réessayer plus tard."
                }
                timer={0.5}
                callBack={navigation.goBack}
              />
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default CustomRadioForm;
