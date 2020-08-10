import React, { SFC, useState } from 'react';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import {
  Text,
  Block,
  StackedToBottom,
  Button,
  ModalItemInfos
} from '../../sharedComponents';
import { useStoreState } from '../../../models';
import { ExecutionResult } from 'react-apollo';
import { StackNavigationProp } from '@react-navigation/stack';
import { DetailStackParamsList } from '../../../navigation/Routes';
import { theme } from '../../../constants';

interface Props {
  children: JSX.Element;
  values: object;
  categoryItem: string;
  currentIndex: number;
  totalChildren: number;
  isLast: boolean;
  onSubmit: () => Promise<ExecutionResult<any>>;
  nextStep: () => void;
  prevStep: () => void;
  onChangeValue: (a: string, b: string) => void;
  onSelected: () => void;
  openModal: (a: boolean) => void;
  navigation: StackNavigationProp<DetailStackParamsList>;
}
const MenuItem: SFC<Props> = ({ children, navigation, ...props }) => {
  const width = (props.currentIndex / props.totalChildren) * 100;
  const [selected, setSelected] = useState<boolean>(false);

  const { themeColors } = useStoreState(state => state.Preferences);
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [submitPressed, setSubmitPressed] = useState<boolean>(false);
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);

  const onSubmitForm = () => {
    Keyboard.dismiss();
    props
      .onSubmit()
      .then(({ data, errors }) => {
        data?.addOffering && setOpenModal(true);
        errors && setOpenErrorModal(true);
      })
      .catch(error => {
        error && setOpenErrorModal(true);
        throw new Error(`Ajout offre impossible, ${error}`);
      });
  };
  return (
    <KeyboardAvoidingView behavior={'height'}>
      <View style={styles.titleBar}>
        <TouchableOpacity
          disabled={props.currentIndex === 0}
          onPress={() => props.prevStep()}>
          <AntDesign
            name="left"
            size={theme.sizes.twiceTen * 1.2}
            color={
              props.currentIndex === 0 ? themeColors.gray : themeColors.black
            }
          />
        </TouchableOpacity>

        <Text center title semibold transform="capitalize">
          {props.categoryItem}
        </Text>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="close"
            size={theme.sizes.twiceTen * 1.2}
            color={themeColors.defaultTextColor}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
          height: theme.sizes.border / 2,
          backgroundColor: themeColors.gray2
        }}>
        <View
          style={{
            width: `${width}%`,
            height: theme.sizes.border / 2,
            backgroundColor: themeColors.secondary
          }}></View>
      </View>
      {React.cloneElement(children, {
        values: props.values,
        onChange: props.onChangeValue,
        nextStep: props.nextStep,
        onSelected: setSelected,
        isLast: props.isLast
      })}
      {!props.isLast ? null : (
        <Block
          style={{
            marginVertical: theme.sizes.screenHeight / 5
          }}>
          <StackedToBottom margin={[0, theme.sizes.twiceTen]}>
            <Button
              disabled={!netWorkStatus || submitPressed}
              secondary={netWorkStatus && selected}
              onPress={() => {
                selected && onSubmitForm();
                selected && setSubmitPressed(true);
              }}>
              {submitPressed ? (
                <ActivityIndicator size={'small'} />
              ) : (
                <Text center bold>
                  Soumettre
                </Text>
              )}
            </Button>
          </StackedToBottom>
        </Block>
      )}
      {openModal && (
        <ModalItemInfos
          information={'Votre mission'}
          description={
            "Votre mission vient d'être ajouté à notre liste. Vous serez sous peu contacté par des Helkr prêt à vous aider."
          }
          timer={0.5}
          callBack={navigation.goBack}
        />
      )}

      {openErrorModal && (
        <ModalItemInfos
          errorReporting
          information={'Erreur'}
          description={
            "Une erreur s'est produite lors de la création de la mission. Veuillez réessayer plus tard."
          }
          timer={0.5}
          callBack={navigation.goBack}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.sizes.htwiceTen * 1.2,
    marginBottom: theme.sizes.htwiceTen * 0.75,
    marginHorizontal: theme.sizes.base
  }
});

export default MenuItem;
