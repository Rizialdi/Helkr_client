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
  navigation: StackNavigationInterface<MainStackParamList, 'PrincipalView'>;
}
const Category: SFC<Props> = ({ category, navigation }) => {
  return (
    <TouchableOpacity
      key={category.id}
      onPress={() =>
        navigation.navigation.navigate('DetailCategory', {
          screen: 'DetailCategory',
          params: { category }
        })
      }>
      <Card center middle style={[styles.category]} shadow>
        <Badge
          margin={[0, 0, theme.sizes.hbase / 2]}
          size={theme.sizes.twiceTen * 3.5}
          style={{ backgroundColor: '#F8F8F8' }}>
          <IconSvg kind={category.image} />
        </Badge>
        <Text
          medium
          numberOfLines={1}
          vertical={[0, theme.sizes.htwiceTen / 4]}
          style={{
            fontFamily: 'HelveticaNeue',
            fontSize: theme.sizes.h3
          }}>
          {category.name}
        </Text>
        <Text
          gray
          caption
          numberOfLines={1}
          style={{
            fontFamily: 'HelveticaNeue'
          }}
          horizontal={theme.sizes.htwiceTen / 2}>
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
    minWidth: (width - theme.sizes.inouting * 2) / 2,
    maxWidth: (width - theme.sizes.inouting * 2) / 2,
    maxHeight: (width - theme.sizes.inouting * 2) / 2,
    marginVertical: theme.sizes.htwiceTen / 2
  }
});
