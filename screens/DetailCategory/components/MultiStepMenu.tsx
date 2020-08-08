import React, { Component, ComponentClass } from 'react';
import {
  ExecutionResult,
  graphql,
  MutationFunctionOptions,
  DataValue
} from 'react-apollo';
import { View, AsyncStorage } from 'react-native';

import MenuItem from './MenuItem';
import {
  AddOfferingDocument,
  AddOfferingMutationVariables,
  AddOfferingMutationResult,
  GetUserStatsDocument,
  GetUserStatsQuery
} from '../../../graphql';
import { StackNavigationProp } from '@react-navigation/stack';
import { DetailStackParamsList } from '../../../navigation/Routes';
import { DataProxy } from 'apollo-cache';

// todo values object ? array ?
interface State {
  step: number;
  values: { offeringDescription: string } | null;
}

const ADD_OFFERING = AddOfferingDocument;

// ChildProps<Props, State>, {}

class MultiStepMenu extends Component<Props, State, any> {
  static Item = (props: any) => <MenuItem {...props} />;
  state: State = {
    step: 0,
    values: null
  };
  _nextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  _prevStep = () => {
    this.setState({ step: this.state.step - 1 });
  };

  _onChangeValue = (name: string, value: string) => {
    this.setState((prevState: { values: any }) => ({
      values: { ...prevState.values, [name]: value }
    }));
  };

  _update = async (cache: DataProxy) => {
    const getUserId = async () => {
      const id = await AsyncStorage.getItem('id');
      return id || '';
    };

    const id = await getUserId();
    if (!id) return;
    const dataUserStats = cache.readQuery({
      query: GetUserStatsDocument,
      variables: { id }
    }) as GetUserStatsQuery | undefined;

    if (dataUserStats && dataUserStats.getUserStats) {
      const newDataUserStats = {
        ...dataUserStats,
        getUserStats: {
          ...dataUserStats?.getUserStats,
          proposed: dataUserStats.getUserStats.proposed + 1
        }
      };
      cache.writeQuery({
        query: GetUserStatsDocument,
        variables: { id },
        data: newDataUserStats
      });
    }
  };
  _onSubmit = () => {
    const {
      categoryName,
      categoryItem,
      categoryItemReferenceId,
      addOffering
    } = this.props;
    const { values } = this.state;
    try {
      return (
        addOffering &&
        addOffering({
          variables: {
            type: categoryItem,
            category: categoryName,
            description: values?.offeringDescription,
            details: JSON.stringify(values),
            referenceId: categoryItemReferenceId
          },
          update: this._update
        })
      );
    } catch (error) {
      throw new Error(`Ajout offre impossible, ${error}`);
    }
  };

  render() {
    const { children, categoryItem, navigation } = this.props;
    return (
      <View>
        {React.Children.map(children, (child: any, idx: number) => {
          if (idx === this.state.step) {
            return React.cloneElement(child, {
              values: this.state.values,
              currentIndex: this.state.step,
              totalChildren: children?.length,
              isLast: children ? this.state.step === children.length - 1 : true,
              onSubmit: this._onSubmit,
              nextStep: this._nextStep,
              prevStep: this._prevStep,
              categoryItem: categoryItem,
              navigation: navigation,
              onChangeValue: this._onChangeValue
            });
          }
          return null;
        })}
      </View>
    );
  }
}

type InputProps = AddOfferingMutationVariables & Props;

interface Props {
  categoryName: string;
  categoryItem: string;
  categoryItemReferenceId: string;
  children: JSX.Element[];
  addOffering?: (
    options?: MutationFunctionOptions<any, Record<string, any>>
  ) => Promise<ExecutionResult<any>>;
  navigation: StackNavigationProp<DetailStackParamsList, 'DetailCategory'>;
}

type CustomChildProps = Props &
  InputProps & {
    addOffering: DataValue<
      AddOfferingMutationResult,
      AddOfferingMutationVariables
    >;
  };

export default (graphql<
  Props,
  AddOfferingMutationResult,
  AddOfferingMutationVariables,
  CustomChildProps
>(ADD_OFFERING, {
  name: 'addOffering'
})(
  (MultiStepMenu as unknown) as ComponentClass<CustomChildProps, State>
) as unknown) as ComponentClass<Props, State> & any;

// used casting as any to prevent linting for
// MultiStepMenu.Item
