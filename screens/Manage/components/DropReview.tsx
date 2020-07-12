import React, { FC, useState } from 'react';
import { Block, Button, Text } from '../../shareComponents';
import Stars from 'react-native-stars';

import {
  Dimensions,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../../../constants';
import TextAreaInput from '../../shareComponents/TextAreaInput';
const { height } = Dimensions.get('screen');

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
  const [validationCorrectness, setValidationCorrectness] = useState<boolean>(
    false
  );
  const [ratingValue, setRatingValue] = useState<number>(5);
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
          <Text center bold>
            Merci pour votre confiance.
          </Text>
          <Text center bold vertical={15}>
            Voulez-vous laisser un avis ?
          </Text>
          <Text>
            Ces derniers permettent au Helker d'avoir de meilleurs contrats et
            nous permettent de juger votre satisfaction.
          </Text>
          <TextAreaInput
            min={20}
            max={150}
            placeholder={'Entrez votre avis sur la prestation'}
          />
          <Block flex={false} margin={[20, 20]}>
            <Stars
              default={ratingValue}
              //@ts-ignore
              update={(val: any) => setRatingValue(val)}
              count={5}
              spacing={5}
              starSize={40}
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
            <Text bold center>
              Valider
            </Text>
          </Button>
        </Block>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DropReview;
