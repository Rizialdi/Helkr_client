import React, { FC, useState } from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, View } from 'react-native';

import { theme } from '../../../constants';
import { useStoreState } from '../../../models';
import CompletedOrIssue from './MultiStepMenuCheckout';

interface Props {
  children: JSX.Element;
  values: object;
  categoryItem: string;
  currentIndex: number;
  totalChildren: number;
  isLast: boolean;
  onSubmit: () => void;
  nextStep: () => void;
  onChangeValue: (a: string, b: string) => void;
  onSelected: () => void;
  completedOrIssue: (item: CompletedOrIssue) => void;
}
const MenuItemCheckout: FC<Props> = ({ children, ...props }) => {
  const [selected, setSelected] = useState<boolean>(false);
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);

  return (
    <KeyboardAvoidingView behavior={'padding'}>
      <View style={styles.titleBar}></View>
      {React.cloneElement(children, {
        values: props.values,
        onChange: props.onChangeValue,
        nextStep: props.nextStep,
        onSelected: setSelected,
        isLast: props.isLast,
        completedOrIssue: props.completedOrIssue
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

const styles = StyleSheet.create({
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.sizes.hinouting * 0.96,
    marginBottom: theme.sizes.hinouting * 0.6,
    marginHorizontal: theme.sizes.inouting * 0.64
  }
});

export default MenuItemCheckout;
