import React, { useState, useEffect } from 'react';
import { Card, Badge, Block, Text } from '../components';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  AsyncStorage
} from 'react-native';
import { theme, mocks } from '../constants';
import Image from 'react-native-remote-svg';
import Icon from 'react-native-vector-icons/AntDesign';
const { width } = Dimensions.get('window');

export default function Accueil({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [inputText, setInputText] = useState('');
  const [username, setUsername] = useState('');

  const handleInput = () => setInputText('');
  const retrieve = async () => {
    try {
      const username = await AsyncStorage.getItem('prenom');
      username ? setUsername(username) : setUsername('');
    } catch (error) {
      throw new Error('Unable to load Credentials');
    }
  };

  useEffect(() => {
    setCategories(mocks.accueil);
    retrieve();
  });

  return (
    <Block style={{ backgroundColor: '#FFFFFF' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingVertical: theme.sizes.base * 2 }}
      >
        <Text
          left
          style={{
            fontFamily: 'josefinLight',
            marginHorizontal: 23,
            marginVertical: 20
          }}
        >
          Salut{' '}
          {username && (
            <Text style={{ fontFamily: 'josefinRegular', fontSize: 16 }}>
              {username}
            </Text>
          )}
        </Text>
        <Text
          style={{
            fontFamily: 'josefinRegular',
            fontSize: 16,
            marginHorizontal: 23,
            marginBottom: 20
          }}
        >
          Quels services recherchez-vous ?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            marginBottom: 0,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'space-between',
            marginHorizontal: 23,
            marginVertical: 10,
            height: 40
          }}
        >
          <Block
            style={{
              flex: 0.9,
              alignItems: 'center',
              backgroundColor: 'rgba(238, 240, 246, 0.5)',
              borderRadius: 7,
              marginHorizontal: 5
            }}
          >
            <View
              style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}
            >
              <TextInput
                style={{ flex: 0.9, marginLeft: 10, ...styles.input }}
                defaultValue={inputText}
                onChangeText={(text) => setInputText(text)}
              />
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  padding: 7,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                  marginRight: 5
                }}
                onPress={() => handleInput()}
              >
                {inputText ? (
                  <Icon name="close" size={16} color="black" />
                ) : (
                  <Icon name="search1" size={16} color="black" />
                )}
              </TouchableOpacity>
            </View>
          </Block>
          <TouchableOpacity
            style={{
              flex: 0.1,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(238, 240, 246, 0.5)',
              borderRadius: 7,
              marginLeft: 5
            }}
            onPress={() => handleInput()}
          >
            <Image
              source={require('../assets/icons/reglages.svg')}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        </View>
        <Block flex={false} row space="between" style={styles.categories}>
          {categories
            .filter(
              (category) =>
                `${category.name} ${category.tag}`
                  .toUpperCase()
                  .indexOf(inputText.toUpperCase()) >= 0
            )
            .map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() =>
                  navigation.navigate('DetailCategory', { category })
                }
              >
                <Card center middle shadow style={styles.category}>
                  <Badge margin={[0, 0, 15]} size={70} color="#8febc3">
                    <Image
                      source={category.image}
                      style={{ width: 0, height: 40 }}
                    />
                  </Badge>
                  <Text
                    medium
                    height={20}
                    style={{ fontFamily: 'josefinRegular', fontSize: 18 }}
                  >
                    {category.name}
                  </Text>
                  <Text gray caption>
                    {category.tag}
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
        </Block>
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(238, 240, 246, 0)'
  },
  categories: {
    flexWrap: 'wrap',
    marginTop: 20,
    paddingHorizontal: theme.sizes.base * 1.5,
    marginBottom: theme.sizes.base * 3.5
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
  }
});
