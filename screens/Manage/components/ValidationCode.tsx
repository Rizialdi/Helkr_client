import React, { FC, useState } from 'react';
import { Block, Button, Text } from '../../sharedComponents';
import { TextInput, Keyboard } from 'react-native';

interface Props {
  currentIndex?: number;
  totalChildren?: number;
  isLast?: boolean;
  onSubmit?: () => void;
  nextStep?: () => void;
  onChangeValue?: (a: string, b: string) => void;
  onSelected?: () => void;
  setIsValidationCodeCorrect: React.Dispatch<React.SetStateAction<boolean>>;
}
const CompletedOrIssueComponent: FC<Props> = ({
  nextStep,
  setIsValidationCodeCorrect
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <Block flex={false} margin={[20, 20]}>
      <TextInput
        keyboardType={'numeric'}
        placeholder="Entrer le code de validation"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={value => {
          setInputValue(value);
        }}
        value={inputValue}
      />
      <Button
        secondary
        onPress={() => {
          setIsValidationCodeCorrect(true);
          inputValue && true && nextStep && nextStep();
          Keyboard.dismiss();
        }}>
        <Text bold center>
          Valider
        </Text>
      </Button>
    </Block>
  );
};

export default CompletedOrIssueComponent;
