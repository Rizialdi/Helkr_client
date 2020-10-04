import React, { SFC } from 'react';
import { View, ScrollView, Keyboard } from 'react-native';
import {
  Block,
  Text,
  TextAreaInputValidator,
  StackedToBottom,
  TagItem,
  Button
} from '../../sharedComponents';
import { RouteProp } from '@react-navigation/native';
import { DetailOfferingParamsList } from '../../../navigation/Routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme } from '../../../constants';
import { formatDate } from '../../../utils';
import { useStoreState } from '../../../models';
import {
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native-gesture-handler';
import { useForm } from 'react-hook-form';
import { FormDataOffer } from './makeAnOfferValidation';
import { Form } from '../../SignIn/components';
import validation from './makeAnOfferValidation';

interface Props {
  route?: RouteProp<DetailOfferingParamsList, 'OfferingsListModal'>;
  navigation?: StackNavigationProp<
    DetailOfferingParamsList,
    'OfferingsListModal'
  >;
}

const MakeAnOffer: SFC<Props> = ({ navigation, route }) => {
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);
  const { handleSubmit, register, setValue, errors } = useForm<FormDataOffer>({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const onSubmitOffer = (form: FormDataOffer): void => {
    console.log('remi, form', form);
  };
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <Block
            flex={false}
            margin={[0, theme.sizes.hinouting, theme.sizes.inouting * 2.75]}>
            <Block
              margin={[0, -theme.sizes.inouting]}
              flex={false}
              row
              middle
              space={'around'}>
              <TagItem tag={route?.params.type} type />
              <TagItem tag={route?.params.category} category />
              <TagItem tag={formatDate(route?.params.date)} date />
            </Block>

            <Form
              {...{
                validation,
                setValue,
                register,
                errors
              }}>
              <TextAreaInputValidator
                key={'message'}
                min={20}
                max={160}
                name={'message'}
                label={'Message'}
                placeholder={"Je peux me déplacer dans l'heure pour ..."}
              />
              <TextAreaInputValidator
                min={3}
                max={25}
                key={'estimation'}
                name={'estimation'}
                label={'Estimation'}
                placeholder={'8000 - 10.000 F.cfa'}
              />
            </Form>
          </Block>
        </TouchableWithoutFeedback>
      </ScrollView>
      <Block
        margin={[-theme.sizes.hinouting * 0.1, theme.sizes.inouting * 0.8]}>
        <StackedToBottom>
          <TouchableOpacity
            disabled={!netWorkStatus}
            onPress={handleSubmit(onSubmitOffer)}>
            <Button secondary>
              <Text bold center>
                Envoyez
              </Text>
            </Button>
          </TouchableOpacity>
        </StackedToBottom>
      </Block>
    </View>
  );
};

export default MakeAnOffer;
