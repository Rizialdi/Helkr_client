import React, { Component } from 'react';
import { Text } from './sharedComponents';
import { StyleSheet, Dimensions, View } from 'react-native';
//@ts-ignore
import Image from 'react-native-remote-svg';

interface Props {
  navigation?: any;
}

const { height } = Dimensions.get('screen');

export class BienvenueFirst extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.appTitle}>
          <Text size={48} style={{ fontFamily: 'rockSalt' }}>
            Helkr
          </Text>
        </View>
        <View style={styles.presentation}>
          <View>
            <Image
              source={require('../assets/icons/marksymbol.svg')}
              style={styles.image}
            />
          </View>
          <Text style={styles.text} semibold>
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
    paddingVertical: 20
  },
  appTitle: { flex: 0.4, justifyContent: 'flex-end' },
  image: { width: '100%', height: height / 3 },
  presentation: { flex: 0.6, alignContent: 'center' },
  text: {
    paddingVertical: 15,
    fontFamily: 'josefinRegular',
    fontSize: 16
  }
});

export default BienvenueFirst;
