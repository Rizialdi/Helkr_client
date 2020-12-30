import React, { FC, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/FontAwesome';

import { theme } from '../../../constants';
import { Block, Button, Text } from '../../sharedComponents';
import TextAreaInput from '../../sharedComponents/TextAreaInput';

interface Props {
  currentIndex?: number;
  totalChildren?: number;
  isLast?: boolean;
  onSubmit?: () => void;
  nextStep?: () => void;
  onChangeValue?: (a: string, b: string) => void;
  onSelected?: () => void;
}
const DropReview: FC<Props> = ({ nextStep }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [ratingValue, setRatingValue] = useState<number>(5);
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
          <Text center bold>
            Merci pour votre confiance.
          </Text>
          <Text center bold vertical={theme.sizes.twiceTen * 0.75}>
            Voulez-vous laisser un avis ?
          </Text>
          <Text>
            Ces derniers permettent au Helker d'avoir de meilleurs contrats et
            nous permettent de juger votre satisfaction.
          </Text>
          <TextAreaInput
            min={20}
            max={150}
            parentCallback={setInputValue}
            placeholder={'Entrez votre avis sur la prestation'}
          />
          <Block
            flex={false}
            margin={[theme.sizes.hinouting * 0.8, theme.sizes.inouting * 0.8]}>
            <Stars
              default={ratingValue}
              //@ts-ignore
              update={(val: any) => setRatingValue(val)}
              count={5}
              spacing={theme.sizes.border}
              starSize={theme.sizes.twiceTen * 2}
              fullStar={<Icon name="star" color={theme.colors.secondary} />}
              emptyStar={<Icon name="star-o" />}
            />
          </Block>
          <Button
            secondary
            onPress={() => {
              inputValue && true && nextStep && nextStep();
              Keyboard.dismiss();
            }}>
            <Text bold header center>
              Valider
            </Text>
          </Button>
        </Block>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DropReview;
