import React, { Component } from 'react'
import { View } from 'react-native'
import { Text } from '../components'
import { StyleSheet, Dimensions } from 'react-native'
import Image from 'react-native-remote-svg'

interface Props {
  navigation?: any
}

export class BienvenueFirst extends Component<Props> {
  render() {
    return (
      <View style={ styles.container }>
        <View style={{ flex: 0.4, justifyContent: 'flex-end' }}><Text size={48} style={{ fontFamily: 'rockSalt'}}>Yoko</Text></View>
        <View style={{ flex: 0.6, alignItems: 'center' }}>
          <Image
            source={require('../assets/icons/marksymbol.svg')}
            style={{ width: 120, height: 120 }}
          />
          <Text style={{ paddingVertical: 15, fontFamily: 'josefinRegular', fontSize: 16}} semibold>Toujours trouver la personne qui vous convient</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center', 
    paddingVertical: 20
  },
})

export default BienvenueFirst
