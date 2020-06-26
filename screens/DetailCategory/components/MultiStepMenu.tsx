import React, { Component, ComponentType } from 'react';
import {
  ChildProps,
  ExecutionResult,
  graphql,
  MutationFunctionOptions,
  ChildDataProps,
  DataProps
} from 'react-apollo';
import { View } from 'react-native';

import MenuItem from './MenuItem';
import { AddOfferingDocument } from '../../../graphql';

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

  _onSubmit = () => {
    const { categoryName, categoryItem, addOffering } = this.props;
    const { values } = this.state;
    try {
      addOffering &&
        addOffering({
          variables: {
            type: categoryItem,
            category: categoryName,
            description: values?.offeringDescription,
            details: JSON.stringify(values)
          }
        })
          .then(() => {})
          .catch(error => {
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
              onChangeValue: this._onChangeValue
            });
          }
          return null;
        })}
      </View>
    );
  }
}

interface Props {
  categoryName: string;
  categoryItem: string;
  children: JSX.Element[];
  addOffering: (
    options?: MutationFunctionOptions<any, Record<string, any>>
  ) => Promise<ExecutionResult<any>>;
}

// ChildDataProps<InputProps, Response, Variables>
type TChildProps = ChildDataProps<{}, Props, {}>;

// graphql<InputProps, Response, Variables, ChildProps>()
export default graphql<{}, Props, {}, TChildProps>(ADD_OFFERING, {
  name: 'addOffering'
})((MultiStepMenu as unknown) as ComponentType<DataProps<Props, {}>>);
