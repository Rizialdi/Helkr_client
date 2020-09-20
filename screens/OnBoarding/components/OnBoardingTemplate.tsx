import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { Mark, Phone1, Phone2, Phone3 } from '../../../assets/icons';
import { theme } from '../../../constants';

interface Props {
  style?: object;
  idx?: number;
  textP?: string;
  textS?: string;
}

const OnBoardingTemplate: FC<Props> = ({ idx, textP, textS }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Mark style={styles.image} />
      </View>
      <View style={styles.imagePresentationContainer}>
        {idx === 1 ? (
          <Phone1 width={275} height={275} />
        ) : idx === 2 ? (
          <Phone2 width={275} height={275} />
        ) : idx === 3 ? (
          <Phone3 width={275} height={275} />
        ) : (
          <SvgUri
            width="100%"
            height="100%"
            uri="http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg"
          />
        )}
      </View>
      <View
        style={{
          flex: 0.2,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Text
          style={{
            fontSize: theme.sizes.header,
            marginBottom: theme.sizes.hinouting / 5
          }}>
          {textP}
        </Text>
        <Text style={styles.text}>{textS}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.sizes.hinouting * 0.8
  },
  imageContainer: {
    flex: 0.2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: { width: '100%', height: theme.sizes.screenHeight / 8 },
  imagePresentationContainer: {
    flex: 0.6,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: theme.sizes.caption,
    width: theme.sizes.screenWidth / 1.7,
    textAlign: 'center'
  }
});

export default OnBoardingTemplate;
