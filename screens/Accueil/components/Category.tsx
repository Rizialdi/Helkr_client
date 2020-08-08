import React, { SFC } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Badge, Card, Text } from '../../sharedComponents';
import { CategoryInterface } from './Interfaces';
import {
  StackNavigationInterface,
  MainStackParamList
} from '../../../navigation/Routes';
import { theme } from '../../../constants';
import IconSvg from './IconSvg';

const { width } = Dimensions.get('window');

interface Props {
  category: CategoryInterface;
  navigation: StackNavigationInterface<MainStackParamList>;
}
const Category: SFC<Props> = ({ category, navigation: { navigation } }) => {
  return (
    <TouchableOpacity
      key={category.id}
      onPress={() =>
        navigation.navigate('DetailCategory', {
          screen: 'DetailCategory',
          params: { category }
        })
      }>
      <Card center middle style={[styles.category]} shadow>
        <Badge margin={[0, 0, 15]} size={70} secondary>
          <IconSvg kind={category.image} />
        </Badge>
        <Text
          medium
          height={20}
          style={{ fontFamily: 'josefinRegular', fontSize: 18 }}>
          {category.name}
        </Text>
        <Text gray caption numberOfLines={1} horizontal={10}>
          {Object.keys(category.tag).join(', ')}
        </Text>
      </Card>
    </TouchableOpacity>
  );
};

export default Category;

const styles = StyleSheet.create({
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    marginVertical: 10
  }
});
