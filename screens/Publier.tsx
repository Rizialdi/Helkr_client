import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export class Publier extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Publier </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default Publier
