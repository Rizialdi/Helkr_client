import React, { SFC } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useStoreState } from '../../models';
import Block, { BlockProps } from './Block';
interface Props extends BlockProps {
  title?: string;
  children: JSX.Element | JSX.Element[];
}

const StackedToBottom: SFC<Props> = ({ children, ...props }) => {
  const { themeColors } = useStoreState(state => state.Preferences);
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeColors.background }]}>
      <KeyboardAvoidingView enabled={true} behavior="height">
        <Block flex={false} {...props}>
          {children}
        </Block>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  }
});

export default StackedToBottom;
