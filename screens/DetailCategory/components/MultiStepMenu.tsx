import React, { SFC, useState, Component } from 'react';
import MenuItem from './MenuItem';
import { View } from 'react-native';

interface Props {
  categoryItem: string;
  children: JSX.Element[];
}

interface State {
  step: number;
  values: object | null;
}

class MultiStepMenu extends Component<Props, State> {
  static Item = (props) => <MenuItem {...props} />;

  state = {
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
    this.setState((prevState) => ({
      values: { ...prevState.values, [name]: value }
    }));
  };

  _onSubmit = () => {
    console.log(this.state.values);
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

export default MultiStepMenu;
