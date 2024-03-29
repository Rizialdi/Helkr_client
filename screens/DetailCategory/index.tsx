import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AntDesign } from '@expo/vector-icons';

import { theme } from '../../constants';
import { useStoreState } from '../../models';
import {
  DetailStackParamsList,
  StackNavigationInterface
} from '../../navigation/Routes';
import { Text } from '../sharedComponents';

const Item = ({ title }: { title: string }) => {
  return (
    <View style={styles.item}>
      <Text body semibold transform={'capitalize'} numberOfLines={1}>
        {title}
      </Text>
      <AntDesign name="up" size={15} />
    </View>
  );
};

const DetailCategory = ({
  navigation,
  route
}: StackNavigationInterface<
  DetailStackParamsList,
  'DetailCategory'
>): JSX.Element => {
  const category = route.params.category;
  const { themeColors } = useStoreState(state => state.Preferences);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }}>
      <FlatList
        data={Object.keys(category.tag)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('JoinOrFindAJobber', {
                category: category,
                categoryItem: item
              });
            }}>
            <Item title={item} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.sizes.twiceTen * 1.5,
    paddingVertical: theme.sizes.htwiceTen * 1.5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: theme.sizes.screenWidth
  }
});

export default DetailCategory;
