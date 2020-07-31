import React, { SFC } from 'react';
import { StyleSheet } from 'react-native';
import { Block } from '../../sharedComponents';
import { CategoriesInterface } from './Interfaces';
import Category from './Category';
import {
  StackNavigationInterface,
  MainStackParamList
} from '../../../navigation/Routes';

interface Props {
  categories: CategoriesInterface;
  inputText: string;
  navigation: StackNavigationInterface<MainStackParamList, 'PrincipalView'>;
}
const Categories: SFC<Props> = ({ categories, inputText, navigation }) => {
  return (
    <Block flex={false} row space="between" style={styles.categories}>
      {categories
        ?.filter(
          category =>
            `${category.name} ${Object.keys(category.tag)}`
              .toUpperCase()
              .indexOf(inputText.toUpperCase()) >= 0
        )
        .map((category, key) => (
          <Category {...{ key }} {...{ category, navigation }} />
        ))}
    </Block>
  );
};

export default Categories;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(238, 240, 246, 0)'
  },
  categories: {
    flexWrap: 'wrap',
    marginTop: 20,
    paddingHorizontal: 16 * 1.5,
    marginBottom: 16 * 3.5
  }
});
