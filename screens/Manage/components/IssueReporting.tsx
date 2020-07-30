import React, { FC, useState } from 'react';
import { Block, Button, Text } from '../../sharedComponents';

import { ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';
import { useStoreState } from '../../../models';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
  //@ts-ignore
} from 'react-native-simple-radio-button';
import { TextAreaInput } from '../../sharedComponents';
const { height } = Dimensions.get('screen');
interface Props {
  currentIndex?: number;
  totalChildren?: number;
  isLast?: boolean;
  onSubmit?: () => void;
  nextStep?: () => void;
}
const IssueReporting: FC<Props> = () => {
  const { themeColors } = useStoreState(state => state.Preferences);
  const [selectedIssue, setSelectedIssue] = useState<string>('');

  const objValue = [
    {
      label: "Mon problème n'a pas été réglé",
      value: "Mon problème n'a pas été réglé"
    },
    {
      label: 'Pas assez qualifié (e)',
      value: 'Pas assez qualifié (e)'
    },
    {
      label: 'Je souhaite avec un (e) autre Helkr',
      value: 'Je souhaite avec un (e) autre Helkr'
    }
  ];
  return (
    <KeyboardAvoidingView behavior={'position'}>
      <ScrollView
        style={{
          flex: 1,
          height: height * 0.9
        }}
        alwaysBounceVertical={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Block flex={false} margin={[20, 20]}>
          <Text bold center>
            Nous sommes très désole de le lire
          </Text>
          <Text bold center>
            Pouvez-vous nous en dire plus ?
          </Text>
          <Block flex={false} margin={[15, -20]}>
            <RadioForm animation={true}>
              {objValue.map((obj, i) => (
                <RadioButton labelHorizontal={true} key={i}>
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={selectedIssue && obj.value === selectedIssue}
                    borderWidth={1}
                    buttonInnerColor={themeColors.primary}
                    buttonOuterColor={
                      obj.value
                        ? themeColors.primary
                        : themeColors.defaultTextColor
                    }
                    onPress={() => {
                      setSelectedIssue(obj.value);
                    }}
                    buttonSize={15}
                    buttonOuterSize={20}
                    buttonStyle={{ marginLeft: 10 }}
                    buttonWrapStyle={{
                      marginTop: 20,
                      flex: 0.2,
                      borderBottomWidth: 1,
                      borderBottomColor: themeColors.gray2
                    }}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={() => {
                      setSelectedIssue(obj.value);
                    }}
                    labelStyle={{
                      fontSize: 16,
                      color: themeColors.defaultTextColor
                    }}
                    labelWrapStyle={{
                      flex: 0.8,
                      borderBottomWidth: 1,
                      borderBottomColor: themeColors.gray2,
                      padding: 20,
                      paddingLeft: 0
                    }}
                  />
                </RadioButton>
              ))}
            </RadioForm>
          </Block>
          <Block margin={[15, -10]}>
            <TextAreaInput
              shadow={true}
              placeholder={'Entrez une description de votre problème.'}
              min={10}
              max={250}
            />
          </Block>
          <Button secondary>
            <Text center bold>
              Envoyer{' '}
            </Text>
          </Button>
        </Block>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default IssueReporting;
