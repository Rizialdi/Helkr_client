import React, { SFC } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from './Text';
import { useStoreState } from '../../models';

interface Props {
  title?: string;
  children: JSX.Element;
}

const Layout: SFC<Props> = ({ title, children }) => {
  const { themeColors } = useStoreState(state => state.Preferences);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeColors.background }]}>
      <KeyboardAvoidingView enabled={true} behavior="height">
        {title && (
          <View style={styles.subContainer}>
            <Text style={{ fontFamily: 'josefinBold', fontSize: 25 }}>
              {title}
            </Text>
          </View>
        )}
        <View>{children}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
  },
  text: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D'
  },
  subContainer: {
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 32
  }
});

export default Layout;
