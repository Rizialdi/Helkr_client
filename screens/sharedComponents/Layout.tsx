import { StatusBar } from 'expo-status-bar';
import React, { SFC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AntDesign } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';

import { theme } from '../../constants';
import { useStoreActions } from '../../models';
import Block from './Block';
import Text from './Text';

export interface LayoutProps {
  title?: string;
  children: JSX.Element | JSX.Element[];
  iconName?: string;
  callBack?:
    | (() => void)
    | React.Dispatch<React.SetStateAction<boolean>>
    | undefined;
  callBackParams?: any[];
}

const Layout: SFC<LayoutProps> = ({
  title,
  children,
  iconName,
  callBack,
  callBackParams
}) => {
  const [isInternetConnection, setIsInternetConnection] = useState<boolean>(
    false
  );

  const { setNetWorkStatus } = useStoreActions(action => action.NetWorkStatus);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(({ isInternetReachable }) => {
      setIsInternetConnection(isInternetReachable as boolean);
      setNetWorkStatus(isInternetReachable as boolean);
    });

    return (): void => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: 'white' }]}>
      {isInternetConnection ? (
        <></>
      ) : (
        <Block flex={false} accent>
          <Text white center>
            Vous êtes actuellement hors ligne
          </Text>
        </Block>
      )}
      <StatusBar style="auto" translucent={true} animated={true} />
      <View style={{ flex: 1 }}>
        {!!title && (
          <View style={styles.subContainer}>
            <>
              <Block flex={false} row center space="between">
                <Text
                  style={{
                    fontFamily: 'josefinBold',
                    fontSize: theme.sizes.h1
                  }}>
                  {title}
                </Text>

                <TouchableOpacity
                  //@ts-ignore
                  onPress={() => callBack && callBack(...callBackParams)}>
                  {iconName && (
                    <AntDesign
                      name={iconName || 'meh'}
                      size={(theme.sizes.base - 1) * 2}
                    />
                  )}
                </TouchableOpacity>
              </Block>
            </>
          </View>
        )}
        <View style={{ flex: 1 }}>{children}</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  text: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D'
  },
  subContainer: {
    marginTop: theme.sizes.htwiceTen * 1.2,
    marginBottom: theme.sizes.htwiceTen * 0.5,
    marginHorizontal: theme.sizes.base * 2
  }
});

export default Layout;
