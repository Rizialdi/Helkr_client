import React, { SFC, useState } from 'react';

import { View, Button, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

import { Text } from '../../shareComponents';
import { useStoreState } from '../../../models';

interface Props {
  children: JSX.Element;
  values: string;
  categoryItem: string;
  currentIndex: number;
  totalChildren: number;
  isLast: boolean;
  onSubmit: () => void;
  nextStep: () => void;
  prevStep: () => void;
  onChangeValue: () => void;
  onSelected: () => void;
  openModal: (boolean) => void;
}
const MenuItem: SFC<Props> = ({ children, ...props }) => {
  const width = (props.currentIndex / props.totalChildren) * 100;
  const [selected, setSelected] = useState<boolean>(false);

  const { themeColors } = useStoreState((state) => state.Preferences);
  return (
    <View>
      <View style={styles.titleBar}>
        <TouchableOpacity
          disabled={props.currentIndex === 0}
          onPress={() => props.prevStep()}
        >
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
        style={{ width: '100%', height: 3, backgroundColor: themeColors.gray2 }}
      >
        <View
          style={{
            width: `${width}%`,
            height: 3,
            backgroundColor: themeColors.secondary
          }}
        ></View>
      </View>
      {React.cloneElement(children, {
        values: props.values,
        onChange: props.onChangeValue,
        nextStep: props.nextStep,
        onSelected: setSelected,
        isLast: props.isLast
      })}
      {!props.isLast ? null : (
        <Button
          title="Soumettre"
          disabled={!selected}
          onPress={() => {
            props.onSubmit(), props.openModal(false);
          }}
        />
      )}
    </View>
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
