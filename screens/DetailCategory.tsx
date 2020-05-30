import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Text } from './shareComponents';

interface Props {
  route?: any;
  navigation?: any;
}

const { width } = Dimensions.get('screen');
function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text regular>{title}</Text>
    </View>
  );
}

export class DetailCategory extends Component<Props> {
  //TODO: find a way to modify headers
  static navigationOptions = {
    tabBarLabel: 'Home!',
    headerShown: false
  };

  render() {
    const { category } = this.props.route.params;
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <FlatList
            data={category.tag}
            renderItem={({ item }) => <Item title={item} />}
            keyExtractor={(item) => item}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 10
  },
  item: {
    padding: 15,
    marginVertical: 0,
    marginHorizontal: 16,
    borderBottomColor: 'rgba(0,0,0,0.5)',
    borderBottomWidth: 0.5,
    width: width
  },
  title: {
    fontFamily: 'josefinRegular',
    fontSize: 20
  }
});

export default DetailCategory;
