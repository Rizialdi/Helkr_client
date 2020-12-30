import React, { Component } from 'react';
import { View } from 'react-native';

import MenuItemCheckout from './MenuItemCheckout';

// todo values object ? array ?

interface Props {
  children: JSX.Element[];
}

interface State {
  step: number;
  values: { offeringDescription: string } | null;
}

class MultiStepMenuCheckout extends Component<Props, State, any> {
  static MenuItemCheckout = (props: any) => <MenuItemCheckout {...props} />;
  state: State = {
    step: 0,
    values: null
  };

  _nextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  _onChangeValue = (name: string, value: string) => {
    this.setState((prevState: { values: any }) => ({
      values: { ...prevState.values, [name]: value }
    }));
  };

  _onSubmit = () => {};

  render() {
    const { children } = this.props;
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
              onChangeValue: this._onChangeValue
            });
          }
          return null;
        })}
      </View>
    );
  }
}

export default MultiStepMenuCheckout;
