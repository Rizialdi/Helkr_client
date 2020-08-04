import React from 'react';
import {} from 'react-native';
import MultiStepMenu from './MultiStepMenu';
import { RadioForm } from '.';
import {
  StackNavigationInterface,
  DetailStackParamsList
} from '../../../navigation/Routes';

const DetailItem = ({
  navigation,
  route
}: StackNavigationInterface<DetailStackParamsList, 'DetailItem'>) => {
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
                  radio_props={category.tag[categoryItem].detailQuestions[item]}
                />
              </MultiStepMenu.Item>
            )
          )}
      </MultiStepMenu>
    </>
  );
};

export default DetailItem;
