import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, Layout } from '../../sharedComponents';
import {
  StackNavigationInterface,
  DetailStackParamsList
} from '../../../navigation/Routes';

const { width } = Dimensions.get('screen');

const Item = ({ title }: { title: string }) => {
  return (
    <View style={styles.item}>
      <Text body semibold transform={'capitalize'}>
        {title}
      </Text>
    </View>
  );
};

const DetailCategory = ({
  navigation,
  route
}: StackNavigationInterface<DetailStackParamsList, 'DetailCategory'>) => {
  const { category } = route.params;

  return (
    <Layout>
      <SafeAreaView>
        <FlatList
          data={Object.keys(category.tag)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DetailItem', {
                  category,
                  categoryItem: item
                });
              }}>
              <Item title={item} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
        />
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 10
  },
  item: {
    padding: 20,
    marginVertical: 0,
    marginHorizontal: 16,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 0.5,
    width: width
  },
  title: {
    fontFamily: 'josefinRegular',
    fontSize: 20
  }
});

export default DetailCategory;
