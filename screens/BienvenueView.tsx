import React, { FC } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Text } from './sharedComponents';
//@ts-ignore
import Image from 'react-native-remote-svg';
const { width, height } = Dimensions.get('window');

interface Props {
  style?: object;
  source?: NodeRequire;
  textP?: string;
  textS?: string;
}

const BienvenueView: FC<Props> = ({ source, textP, textS }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/icons/marksymbol.svg')}
          style={styles.image}
        />
      </View>
      <View style={styles.imagePresentationContainer}>
        <Image source={source} style={{ width: 250, height: 250 }} />
      </View>
      <View style={{ flex: 0.2, alignItems: 'center' }}>
        <Text style={{ fontFamily: 'serifBold', fontSize: 16 }}>{textP}</Text>
        <Text style={styles.text}>{textS}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20
  },
  imageContainer: {
    flex: 0.2,
    width: '100%',
    justifyContent: 'center'
  },
  image: { width: '100%', height: height / 8 },
  imagePresentationContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'josefinLight',
    fontSize: 12,
    width: width / 1.7,
    textAlign: 'center'
  }
});

export default BienvenueView;
