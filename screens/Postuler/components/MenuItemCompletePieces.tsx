import React, { SFC, useState } from 'react';

import { View, Button, Dimensions, KeyboardAvoidingView } from 'react-native';
import { MenuItemCompletePiecesProps } from './MenuItemCompletePiecesProps';

const { height } = Dimensions.get('screen');
const MenuItemCompletePieces: SFC<MenuItemCompletePiecesProps> = ({
  children,
  ...props
}) => {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <KeyboardAvoidingView behavior={'padding'}>
      {React.cloneElement(children, {
        listOfPieces: props.listOfPieces,
        referenceId: props.referenceId,
        setOpenModal: props.setOpenModal,
        onChange: props.onChangeValue,
        nextStep: props.nextStep,
        onSelected: setSelected,
        isLast: props.isLast,
        values: props.values
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

export default MenuItemCompletePieces;
