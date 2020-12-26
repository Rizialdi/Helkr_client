import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { theme } from '../../../constants';
import { Mark } from '../../../assets/icons';

const MarkPresentation = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.appTitle}>
        <Text
          style={{
            fontSize: theme.sizes.h1 * 1.84,
            fontFamily: 'HelveticaNeue'
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
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MarkPresentation;
