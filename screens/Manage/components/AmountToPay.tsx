import React, { FC, useState } from 'react';
import { Block, Button, Text } from '../../shareComponents';
import { TextInput, Keyboard } from 'react-native';

interface Props {
  currentIndex?: number;
  totalChildren?: number;
  isLast?: boolean;
  onSubmit?: () => void;
  nextStep?: () => void;
  onChangeValue?: (a: string, b: string) => void;
  onSelected?: () => void;
  setPriceToPay: React.Dispatch<React.SetStateAction<string>>;
}
const CompletedOrIssueComponent: FC<Props> = ({ nextStep, setPriceToPay }) => {
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <Block flex={false} margin={[20, 20]}>
      <TextInput
        keyboardType={'numeric'}
        placeholder="Entrer le prix"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={value => {
          setInputValue(value), setPriceToPay(value);
        }}
        value={inputValue}
      />
      <Button
        secondary
        onPress={() => {
          inputValue && nextStep && nextStep();
          Keyboard.dismiss();
        }}>
        <Text bold center>
          Payer {inputValue} F. cfa
        </Text>
      </Button>
    </Block>
  );
};

export default CompletedOrIssueComponent;
