import React, { SFC, useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Block from './Block';
import { StatusBar } from 'expo-status-bar';
import NetInfo from '@react-native-community/netinfo';
import { AntDesign } from '@expo/vector-icons';
import Text from './Text';
import { useStoreState, useStoreActions } from '../../models';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  title?: string;
  children: JSX.Element;
  iconName?: string;
  callBack?:
    | (() => void)
    | React.Dispatch<React.SetStateAction<boolean>>
    | undefined;
  callBackParams?: any[];
}

const Layout: SFC<Props> = ({
  title,
  children,
  iconName,
  callBack,
  callBackParams
}) => {
  const { themeColors } = useStoreState(state => state.Preferences);
  let [isInternetConnection, setIsInternetConnection] = useState<boolean>(
    false
  );

  const { setNetWorkStatus } = useStoreActions(action => action.NetWorkStatus);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(({ isInternetReachable }) => {
      setIsInternetConnection(isInternetReachable as boolean);
      setNetWorkStatus(isInternetReachable as boolean);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeColors.background }]}>
      {isInternetConnection ? (
        <></>
      ) : (
        <Block flex={false} accent>
          <Text white center>
            Vous êtes actuellement hors ligne
          </Text>
        </Block>
      )}
      <StatusBar style="dark" translucent={true} animated={true} />
      <KeyboardAvoidingView enabled={true} behavior="height">
        {title && (
          <View style={styles.subContainer}>
            <Block flex={false} row center space="between">
              <Text style={{ fontFamily: 'josefinBold', fontSize: 25 }}>
                {title}
              </Text>

              <TouchableOpacity
                //@ts-ignore
                onPress={() => callBack && callBack(...callBackParams)}>
                {iconName && <AntDesign name={iconName || 'meh'} size={30} />}
              </TouchableOpacity>
            </Block>
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
