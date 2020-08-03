import React, { SFC, useState } from 'react';
import { CompletedOrIssue } from './ModalItemManageCandidates';

import {
  View,
  Button,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import { useStoreState } from '../../../models';

const { height } = Dimensions.get('screen');
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
const MenuItemCheckout: SFC<Props> = ({ children, ...props }) => {
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
            marginVertical: height / 4
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
    marginTop: 24,
    marginBottom: 15,
    marginHorizontal: 16
  }
});

export default MenuItemCheckout;
