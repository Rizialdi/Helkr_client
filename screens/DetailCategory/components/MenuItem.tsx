import React, { SFC } from 'react';
import { ExecutionResult } from 'react-apollo';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

import { theme } from '../../../constants';
import { useStoreState } from '../../../models';
import { DetailStackParamsList } from '../../../navigation/Routes';
import { Text } from '../../sharedComponents';

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
  const { themeColors } = useStoreState(state => state.Preferences);

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      style={{ backgroundColor: themeColors.background }}>
      <View style={[styles.titleBar]}>
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
        isLast: props.isLast,
        onSubmit: props.onSubmit,
        navigation: navigation
      })}
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
