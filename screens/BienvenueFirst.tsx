import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
//@ts-ignore
import Image from 'react-native-remote-svg';
import { theme } from '../constants';

interface Props {
  navigation?: any;
}

export class BienvenueFirst extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.appTitle}>
          <Text style={{ fontSize: 48 }}>Helkr</Text>
        </View>
        <View style={styles.presentation}>
          <View>
            <Image
              source={require('../assets/icons/marksymbol.svg')}
              style={styles.image}
            />
          </View>
          <Text style={styles.text}>
            Toujours trouver la personne qui vous convient
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.sizes.htwiceTen
  },
  appTitle: { flex: 0.4, justifyContent: 'flex-end' },
  image: { width: '100%', height: theme.sizes.screenHeight / 3 },
  presentation: { flex: 0.6, alignContent: 'center' },
  text: {
    paddingVertical: theme.sizes.hinouting * 0.6,
    fontSize: theme.sizes.header,
    fontWeight: '500'
  }
});

export default BienvenueFirst;
