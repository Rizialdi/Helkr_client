import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../../../constants';
import { Mark } from '../../../assets/icons';
import { Text } from '../../sharedComponents';

const MarkPresentation = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.appTitle}>
        <Text
          style={{
            fontFamily: 'josefinBold',
            fontSize: theme.sizes.htwiceTen * 3
          }}>
          Helkr
        </Text>
      </View>
      <View style={styles.presentation}>
        <Mark width={350} height={350} />
      </View>
      <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
        <Text style={styles.text}>
          Toujours trouver un prestataire pour votre besoin.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.sizes.htwiceTen
  },
  appTitle: {
    flex: 0.3,
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: theme.sizes.screenHeight / 3,
    alignItems: 'center'
  },
  presentation: { flex: 0.5, alignItems: 'center' },
  text: {
    paddingVertical: theme.sizes.hinouting * 0.6,
    fontSize: theme.sizes.header,
    fontFamily: 'HelveticaNeue',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MarkPresentation;
