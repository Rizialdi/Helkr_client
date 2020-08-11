import React, { SFC, useState } from 'react';
import { View, Button, KeyboardAvoidingView } from 'react-native';

import { MenuItemCompletePiecesProps } from './MenuItemCompletePiecesProps';
import { useStoreState } from '../../../models';
import { theme } from '../../../constants';
import { Block } from '../../sharedComponents';

const MenuItemCompletePieces: SFC<MenuItemCompletePiecesProps> = ({
  children,
  ...props
}) => {
  const [selected, setSelected] = useState<boolean>(false);
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);

  return (
    <View style={{ height: '100%' }}>
      <View>
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
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 0 }}>
        {!props.isLast ? null : (
          <Button
            title="Soumettre"
            disabled={!selected || !netWorkStatus}
            onPress={() => {
              props.onSubmit();
            }}
          />
        )}
      </View>
    </View>
  );
};

export default MenuItemCompletePieces;
