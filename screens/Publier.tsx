import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from './shareComponents';

export class Publier extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Publier </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default Publier;
