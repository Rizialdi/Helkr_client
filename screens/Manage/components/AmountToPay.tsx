import React, { FC, useState } from 'react';
import { Block, Button, Text } from '../../sharedComponents';
import { TextInput, Keyboard } from 'react-native';
import { theme } from '../../../constants';

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
    <Block
      flex={false}
      margin={[theme.sizes.hinouting * 0.8, theme.sizes.inouting * 0.8]}>
      <TextInput
        keyboardType={'numeric'}
        placeholder="Entrer le prix"
        style={{
          color: 'black',
          height: theme.sizes.twiceTen * 2,
          borderColor: 'gray',
          borderWidth: 1
        }}
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
