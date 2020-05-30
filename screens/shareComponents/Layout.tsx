import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';

import Text from './Text';

import { theme } from '../../constants';
import { useStoreState } from '../../models';

export default ({ title, children }) => {
  const { themeColors } = useStoreState((state) => state.Preferences);

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: themeColors.background }}
    >
      <KeyboardAvoidingView enabled={true} behavior="position">
        <View
          style={{
            marginTop: 40,
            marginBottom: 20,
            marginHorizontal: theme.sizes.base * 2
          }}
        >
          <Text style={{ fontFamily: 'josefinBold', fontSize: 25 }}>
            {title}
          </Text>
        </View>
        <View>{children}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  text: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D'
  }
});
