import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  Mark,
  CreateOfferingSvg,
  ReceivePropositionSvg,
  MakeMoneySvg,
  SortCandidatesSvg,
  MakeCommentSvg
} from '../../../assets/icons';
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
          <CreateOfferingSvg width={350} height={350} />
        ) : idx === 2 ? (
          <ReceivePropositionSvg width={350} height={350} />
        ) : idx === 3 ? (
          <SortCandidatesSvg width={350} height={350} />
        ) : idx === 4 ? (
          <MakeMoneySvg width={350} height={350} />
        ) : (
          <MakeCommentSvg width={350} height={350} />
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
