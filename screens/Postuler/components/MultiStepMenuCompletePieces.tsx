import React, { Component, ComponentType } from 'react';

import { View } from 'react-native';

import MenuItemCompletePieces from './MenuItemCompletePieces';
import { ListOfPieces } from './ModalItemApplyToOffering';

// todo values object ? array ?

interface Props {
  children: JSX.Element[];
  listOfPieces: ListOfPieces;
  referenceId: string;
  setOpenModal: React.Dispatch<React.SetStateAction<Boolean>>;
}

interface State {
  step: number;
  values: { offeringDescription: string } | null;
}

class MultiStepMenuCompletePieces extends Component<Props, State, any> {
  static MenuItemCompletePieces = (props: any) => (
    <MenuItemCompletePieces {...props} />
  );
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
              referenceId: this.props.referenceId,
              listOfPieces: this.props.listOfPieces,
              setOpenModal: this.props.setOpenModal,
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

export default MultiStepMenuCompletePieces;
