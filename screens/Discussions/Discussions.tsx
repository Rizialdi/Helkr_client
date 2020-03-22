import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Text, FlatList, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { theme, mocks } from "../../constants";
import navigation from '../../navigation';

const { width } = Dimensions.get('screen')

function Item({ name, message, image, navigation }) {
  return (
    <>
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Discussion')}>
        <View style={{ flex: 0.25 }}>
          <TouchableOpacity style={{ width: 70, height: 70, borderRadius: 50, overflow: 'hidden', margin: 'auto' }}>
            <Image
              source={image}
              resizeMode='cover'
              style={{ width: '100%', height: '100%' }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.75, alignSelf: 'flex-start' }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

export default function Discussion({ navigation }) {

  const [discussions, setDiscussions] = useState([])

  useEffect(() => setDiscussions(mocks.discussions))

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={{ marginTop: 40, marginBottom: 20, marginHorizontal: theme.sizes.base * 2 }}>
          <Text style={{ fontFamily: 'josefinBold', fontSize: 25 }}>
            Discussions
            </Text>
        </View>
        <FlatList
          data={discussions}
          renderItem={({ item }) => <Item name={item.name} message={item.message} image={item.image} navigation={navigation} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginVertical: 0,
    borderBottomColor: 'rgba(0,0,0,0.5)',
    borderBottomWidth: 0.5,
    width: width,
    height: 100
  },
  name: {
    fontFamily: 'josefinRegular',
    fontSize: 20,
  },
  message: {
    fontFamily: 'josefinRegular',
    fontSize: 14,
  }
})
