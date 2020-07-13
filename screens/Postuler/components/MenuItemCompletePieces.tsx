import React, { SFC, useState } from 'react';

import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import { ListOfPieces } from './ModalItemApplyToOffering';

const { height } = Dimensions.get('screen');
interface Props {
  children: JSX.Element;
  values: object;
  listOfPieces: ListOfPieces;
  categoryItem: string;
  currentIndex: number;
  totalChildren: number;
  isLast: boolean;
  onSubmit: () => void;
  nextStep: () => void;
  onChangeValue: (a: string, b: string) => void;
}
const MenuItemCompletePieces: SFC<Props> = ({ children, ...props }) => {
  const width = (props.currentIndex / props.totalChildren) * 100;
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <KeyboardAvoidingView behavior={'padding'}>
      {React.cloneElement(children, {
        listOfPieces: props.listOfPieces,
        values: props.values,
        onChange: props.onChangeValue,
        nextStep: props.nextStep,
        onSelected: setSelected,
        isLast: props.isLast
      })}
      {!props.isLast ? null : (
        <View
          style={{
            marginVertical: height / 4
          }}>
          <Button
            title="Soumettre"
            disabled={!selected}
            onPress={() => {
              props.onSubmit();
            }}
          />
        </View>
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

export default MenuItemCompletePieces;
