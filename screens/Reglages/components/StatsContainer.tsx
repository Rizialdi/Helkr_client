import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

export default ({ done, proposed, average }) => (
  <View style={styles.statsContainer}>
    <View style={styles.statsBox}>
      <Text style={[styles.text, { fontSize: 24 }]}>{done}</Text>
      <Text style={[styles.text, styles.subText]}>Accomplies</Text>
    </View>
    <View
      style={[
        styles.statsBox,
        {
          borderColor: '#DFD8C8',
          borderLeftWidth: 1,
          borderRightWidth: 1
        }
      ]}
    >
      <Text style={[styles.text, { fontSize: 24 }]}>{proposed}</Text>
      <Text style={[styles.text, styles.subText]}>Proposées</Text>
    </View>
    <View style={styles.statsBox}>
      <Text style={[styles.text, { fontSize: 24 }]}>{`${average}/5`}</Text>
      <Text style={[styles.text, styles.subText]}>Moyenne</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 32
  },
  statsBox: {
    alignItems: 'center',
    flex: 1
  },
  subText: {
    fontSize: 12,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500'
  },
  text: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D'
  }
});
