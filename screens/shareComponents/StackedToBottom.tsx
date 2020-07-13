import React, { SFC } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import { useStoreState } from '../../models';

interface Props {
  title?: string;
  children: JSX.Element | JSX.Element[];
}

const StackedToBottom: SFC<Props> = ({ children }) => {
  const { themeColors } = useStoreState(state => state.Preferences);

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: themeColors.background }}>
      <KeyboardAvoidingView enabled={true} behavior="height">
        {children}
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
