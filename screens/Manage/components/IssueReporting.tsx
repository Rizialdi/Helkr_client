import React, { FC, useState } from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
  //@ts-ignore
} from 'react-native-simple-radio-button';

import { useStoreState } from '../../../models';
import { Block, Button, Text, TextAreaInput } from '../../sharedComponents';
import { theme } from '../../../constants';

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
          height: theme.sizes.screenHeight * 0.9
        }}
        alwaysBounceVertical={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Block
          flex={false}
          margin={[theme.sizes.hinouting * 0.8, theme.sizes.inouting * 0.8]}>
          <Text bold center>
            Nous sommes très désole de le lire
          </Text>
          <Text bold center>
            Pouvez-vous nous en dire plus ?
          </Text>
          <Block
            flex={false}
            margin={[theme.sizes.hinouting * 0.6, -theme.sizes.inouting * 0.8]}>
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
                    buttonSize={theme.sizes.twiceTen * 0.75}
                    buttonOuterSize={theme.sizes.twiceTen}
                    buttonStyle={{ marginLeft: theme.sizes.twiceTen / 2 }}
                    buttonWrapStyle={{
                      marginTop: theme.sizes.htwiceTen,
                      flex: 0.2,
                      borderBottomWidth: theme.sizes.border / 5,
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
                      fontSize: theme.sizes.header,
                      color: themeColors.defaultTextColor
                    }}
                    labelWrapStyle={{
                      flex: 0.8,
                      borderBottomWidth: 1,
                      borderBottomColor: themeColors.gray2,
                      paddingHorizontal: theme.sizes.inouting * 0.8,
                      paddingVertical: theme.sizes.hinouting * 0.8,
                      paddingLeft: 0
                    }}
                  />
                </RadioButton>
              ))}
            </RadioForm>
          </Block>
          <Block
            margin={[theme.sizes.hinouting * 0.6, -theme.sizes.inouting * 0.4]}>
            <TextAreaInput
              shadow={true}
              placeholder={'Entrez une description de votre problème.'}
              min={10}
              max={250}
            />
          </Block>
          <Button secondary>
            <Text center bold>
              Envoyer
            </Text>
          </Button>
        </Block>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default IssueReporting;
