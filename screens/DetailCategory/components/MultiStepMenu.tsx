import gql from 'graphql-tag';
import React, { Component } from 'react';
import {
  ChildProps,
  ExecutionResult,
  graphql,
  MutationFunctionOptions
} from 'react-apollo';
import { View } from 'react-native';

import MenuItem from './MenuItem';

interface Props {
  categoryName: string;
  categoryItem: string;
  children: JSX.Element[];
  addOffering: (
    options?: MutationFunctionOptions<any, Record<string, any>>
  ) => Promise<ExecutionResult<any>>;
}

interface State {
  step: number;
  values: { offeringDescription: string } | null;
}

const ADD_OFFERING = gql`
  mutation addOffering(
    $type: String!
    $category: String!
    $description: String!
    $details: String!
  ) {
    addOffering(
      type: $type
      category: $category
      description: $description
      details: $details
    )
  }
`;

class MultiStepMenu extends Component<ChildProps<Props, State>, {}> {
  static Item = (props) => <MenuItem {...props} />;
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

  _onSubmit = () => {
    const { categoryName, categoryItem, addOffering } = this.props;
    const { values } = this.state;
    try {
      addOffering({
        variables: {
          type: categoryItem,
          category: categoryName,
          description: values.offeringDescription,
          details: JSON.stringify(values)
        }
      })
        .then(() => {})
        .catch((error) => {
          throw new Error(`Ajout offre impossible, ${error}`);
        });
    } catch (error) {
      throw new Error(`Ajout offre impossible, ${error}`);
    }
  };

  render() {
    const { children, categoryItem } = this.props;
    return (
      <View>
        {React.Children.map(children, (child, idx) => {
          if (idx === this.state.step) {
            return React.cloneElement(child, {
              values: this.state.values,
              currentIndex: this.state.step,
              totalChildren: children.length,
              isLast: this.state.step === children.length - 1,
              onSubmit: this._onSubmit,
              nextStep: this._nextStep,
              prevStep: this._prevStep,
              categoryItem: categoryItem,
              onChangeValue: this._onChangeValue
            });
          }
          return null;
        })}
      </View>
    );
  }
}

export default graphql(ADD_OFFERING, { name: 'addOffering' })(MultiStepMenu);
