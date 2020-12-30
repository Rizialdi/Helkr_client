import React from 'react';
import {} from 'react-native';

import {
  DetailStackParamsList,
  StackNavigationInterface
} from '../../../navigation/Routes';
import { RadioForm } from './';
import MultiStepMenu from './MultiStepMenu';

const DetailItem = ({
  navigation,
  route
}: StackNavigationInterface<
  DetailStackParamsList,
  'DetailItem'
>): JSX.Element => {
  const { category, categoryItem } = route.params;

  return (
    <>
      <MultiStepMenu
        categoryName={category.name}
        categoryItem={categoryItem}
        navigation={navigation}
        categoryItemReferenceId={category.tag[categoryItem].referenceId}>
        {categoryItem &&
          Object.keys(category.tag[categoryItem].detailQuestions).map(
            (item, idx) => (
              <MultiStepMenu.Item key={idx} openModal={() => null}>
                <RadioForm
                  name={item}
                  radioProps={category.tag[categoryItem].detailQuestions[item]}
                />
              </MultiStepMenu.Item>
            )
          )}
      </MultiStepMenu>
    </>
  );
};

export default DetailItem;
