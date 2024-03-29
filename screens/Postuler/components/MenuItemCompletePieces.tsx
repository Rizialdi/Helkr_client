import React, { SFC, useState } from 'react';
import { Button, KeyboardAvoidingView, View } from 'react-native';

import { theme } from '../../../constants';
import { useStoreState } from '../../../models';
import { MenuItemCompletePiecesProps } from './MenuItemCompletePiecesProps';

const MenuItemCompletePieces: SFC<MenuItemCompletePiecesProps> = ({
  children,
  ...props
}) => {
  const [selected, setSelected] = useState<boolean>(false);
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);

  return (
    <KeyboardAvoidingView behavior={'padding'}>
      {React.cloneElement(children, {
        listOfPieces: props.listOfPieces,
        referenceId: props.referenceId,
        setOpenModal: props.setOpenModal,
        setModalOverlaySize: props.setModalOverlaySize,
        onChange: props.onChangeValue,
        nextStep: props.nextStep,
        onSelected: setSelected,
        isLast: props.isLast,
        values: props.values
      })}
      {!props.isLast ? null : (
        <View
          style={{
            marginVertical: theme.sizes.screenHeight / 4
          }}>
          <Button
            title="Soumettre"
            disabled={!selected || !netWorkStatus}
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
