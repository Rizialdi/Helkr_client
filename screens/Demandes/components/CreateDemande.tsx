import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Keyboard, ScrollView, View } from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native-gesture-handler';

import client from '../../../ApolloClient';
import { theme } from '../../../constants';
import { useCreateDemandeMutation } from '../../../graphql';
import { useStoreState } from '../../../models';
import {
  DemandesParamsList,
  StackNavigationInterface
} from '../../../navigation/Routes';
import {
  Block,
  Button,
  ModalItemInfos,
  StackedToBottom,
  Text,
  TextAreaInputValidator
} from '../../sharedComponents';
import { Form } from '../../SignIn/components';
import validation, { FormDataOffer } from './createDemandeValidation';

const CreateDemande = ({
  navigation,
  route: { params }
}: StackNavigationInterface<DemandesParamsList, 'CreateDemande'>) => {
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const { handleSubmit, register, setValue, errors } = useForm<FormDataOffer>({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const [
    createDemandeMutation,
    { data, loading, called, error }
  ] = useCreateDemandeMutation();

  const recipientId = params && params.id ? params.id : '';

  const onSubmitDemande = (form: FormDataOffer): void => {
    createDemandeMutation({
      variables: {
        message: form.message,
        recipient: recipientId
      }
    }).then(({ data, errors: submissionError }) => {
      try {
        if (data?.createDemande) {
          client.reFetchObservableQueries();
          //   TODO Update Function
        }

        if (submissionError || error) {
          setErrorModal(true);
        }
      } catch (err) {
        throw new Error(`Impossible de faire une demande ${err}`);
      }
    });
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
              space={'around'}></Block>

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
                max={250}
                name={'message'}
                label={'Message'}
                placeholder={"J'aimerais prendre contact avec vous pour ..."}
              />
            </Form>
          </Block>
        </TouchableWithoutFeedback>
      </ScrollView>
      {(errorModal ||
        (called &&
          data?.createDemande != undefined &&
          !data?.createDemande)) && (
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

      {data?.createDemande && (
        <ModalItemInfos
          information={'Envoyée'}
          description={
            'Votre demande de services à été envoyée avec succès. ' +
            "N'hesitez pas à directement appeler le prestataire si " +
            "vous n'avez aucune reponse."
          }
          timer={1}
          callBack={navigation?.goBack}
        />
      )}
      <Block
        margin={[-theme.sizes.hinouting * 0.1, theme.sizes.inouting * 0.8]}>
        <StackedToBottom>
          <TouchableOpacity
            disabled={!netWorkStatus}
            onPress={handleSubmit(onSubmitDemande)}>
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

export default CreateDemande;
