import React, { SFC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Keyboard, ScrollView, View } from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native-gesture-handler';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import client from '../../../ApolloClient';
import { theme } from '../../../constants';
import { useCandidateToOfferingMutation } from '../../../graphql';
import { useStoreState } from '../../../models';
import { DetailOfferingParamsList } from '../../../navigation/Routes';
import { formatDate } from '../../../utils';
import {
  Block,
  Button,
  ModalItemInfos,
  StackedToBottom,
  TagItem,
  Text,
  TextAreaInputValidator
} from '../../sharedComponents';
import { Form } from '../../SignIn/components';
import validation, { FormDataOffer } from './makeAnOfferValidation';

interface Props {
  route?: RouteProp<DetailOfferingParamsList, 'MakeAnOffer'>;
  navigation?: StackNavigationProp<DetailOfferingParamsList, 'MakeAnOffer'>;
}

const MakeAnOffer: SFC<Props> = ({ navigation, route }) => {
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [applyTo, { data, loading, error }] = useCandidateToOfferingMutation();

  const { handleSubmit, register, setValue, errors } = useForm<FormDataOffer>({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const onSubmitOffer = (form: FormDataOffer): void => {
    applyTo({
      variables: {
        id: route?.params.id as string,
        message: form.message,
        priceRange: form.estimation
      }
    }).then(({ data, errors: submissionError }) => {
      try {
        if (data?.candidateToOffering && data.candidateToOffering.success) {
          client.reFetchObservableQueries();
          //   TODO Update Function
        }

        if (submissionError || error) {
          setErrorModal(true);
        }
      } catch (err) {
        throw new Error(`Impossible de Candidater ${err}`);
      }
    });
    // .then(() => navigation?.goBack())
    // .then(() => navigation?.goBack());
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

      {errorModal && (
        <ModalItemInfos
          errorReporting
          information={'Erreur'}
          description={
            "Une erreur s'est produite pendant votre candidature. Veuillez réessayer plus tard."
          }
          timer={1}
          callBack={navigation?.goBack}
        />
      )}

      {/* {data?.candidateToOffering.success && (
        <ModalItemInfos
          information={'Envoyé'}
          description={'Proposition envoyée pour cette offre.'}
          timer={1}
          callBack={() => navigation?.pop(5)}
        />
      )} */}

      {data?.candidateToOffering.success && navigation?.pop(2)}

      <Block
        margin={[-theme.sizes.hinouting * 0.1, theme.sizes.inouting * 0.8]}>
        <StackedToBottom>
          <TouchableOpacity
            disabled={!netWorkStatus}
            onPress={handleSubmit(onSubmitOffer)}>
            <Button secondary>
              {loading ? (
                <ActivityIndicator size={'small'} />
              ) : (
                <Text bold center>
                  Envoyez
                </Text>
              )}
            </Button>
          </TouchableOpacity>
        </StackedToBottom>
      </Block>
    </View>
  );
};

export default MakeAnOffer;
