import React, { FC, useState } from 'react';
import { Block, Button, Text } from '../../sharedComponents';
import { TextInput, Keyboard } from 'react-native';
import { useStoreState } from '../../../models';
import { theme } from '../../../constants';

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
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);

  return (
    <Block flex={false} margin={[theme.sizes.htwiceTen, theme.sizes.twiceTen]}>
      <TextInput
        keyboardType={'numeric'}
        placeholder="Entrer le code de validation"
        style={{
          height: theme.sizes.htwiceTen * 2,
          borderColor: 'gray',
          borderWidth: 1
        }}
        onChangeText={value => {
          setInputValue(value);
        }}
        value={inputValue}
      />
      <Button
        secondary
        disabled={!netWorkStatus}
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
