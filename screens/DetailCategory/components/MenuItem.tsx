import React, { SFC, useState } from 'react';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

import {
  Text,
  StackedToBottom,
  Button,
  ModalItemInfos
} from '../../sharedComponents';
import { useStoreState } from '../../../models';
import { ExecutionResult } from 'react-apollo';
import Block from '../../sharedComponents/Block';

const { height } = Dimensions.get('screen');
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
}
const MenuItem: SFC<Props> = ({ children, ...props }) => {
  const width = (props.currentIndex / props.totalChildren) * 100;
  const [selected, setSelected] = useState<boolean>(false);

  const { themeColors } = useStoreState(state => state.Preferences);
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);
  const [openModal, setOpenModal] = useState(false);

  const onSubmitForm = () => {
    props
      .onSubmit()
      .then(({ data }) => {
        data?.addOffering && setOpenModal(true);
        // Alert.alert(
        //   'Votre annonce',
        //   "vient d'être ajouté",
        //   [{ text: 'OK', onPress: () => props.openModal(false) }],
        //   { cancelable: false }
        // );
      })
      .catch(error => {
        throw new Error(`Ajout offre impossible, ${error}`);
      });
  };
  return (
    <KeyboardAvoidingView behavior={'padding'}>
      <View style={styles.titleBar}>
        <TouchableOpacity
          disabled={props.currentIndex === 0}
          onPress={() => props.prevStep()}>
          <Icon
            name="left"
            size={24}
            color={
              props.currentIndex === 0 ? themeColors.gray : themeColors.black
            }
          />
        </TouchableOpacity>

        <Text center title semibold transform="capitalize">
          {props.categoryItem}
        </Text>

        <TouchableOpacity onPress={() => props.openModal(false)}>
          <Icon name="close" size={24} color={themeColors.defaultTextColor} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
          height: 3,
          backgroundColor: themeColors.gray2
        }}>
        <View
          style={{
            width: `${width}%`,
            height: 3,
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
            marginVertical: height / 4
          }}>
          <StackedToBottom margin={[20, 20]}>
            <Button
              disabled={!netWorkStatus}
              secondary={netWorkStatus && selected}
              onPress={() => {
                selected && onSubmitForm();
              }}>
              <Text center bold>
                Soumettre
              </Text>
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
          timer={1}
          callBack={props.openModal}
          callBackParams={[false]}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 15,
    marginHorizontal: 16
  }
});

export default MenuItem;
