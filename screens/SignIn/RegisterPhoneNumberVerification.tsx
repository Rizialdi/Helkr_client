import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Dimensions, Keyboard, View } from 'react-native';

import { theme } from '../../constants';
import {
  useAuthStepOneLazyQuery,
  useAuthStepTwoLazyQuery
} from '../../graphql';
import { useStoreState } from '../../models';
import {
  MainStackParamList,
  StackNavigationInterface
} from '../../navigation/Routes';
import { Button, ModalItemInfos, Text } from '../sharedComponents';
import { Form, InputValidator, SignInLayout, validation } from './components';
import { FormData } from './components/validation';

const { width } = Dimensions.get('screen');

const RegisterPhoneNumberVerification = ({
  navigation,
  route
}: StackNavigationInterface<
  MainStackParamList,
  'RegisterPhoneNumberVerification'
>): JSX.Element => {
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);

  const numberToVerify = route.params.phoneNumberToVerify
    ? route.params.phoneNumberToVerify
    : '';
  const { handleSubmit, register, setValue, errors } = useForm<FormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

  const [
    callAuthStepOne,
    { data: dataStepOne, called: calledStepOne }
  ] = useAuthStepOneLazyQuery();

  const [
    callAuthStepTwo,
    { data, loading, error, called }
  ] = useAuthStepTwoLazyQuery();

  const onSubmitCodeVerification = (formData: FormData): void => {
    if (!calledStepOne || !dataStepOne?.AUTH_STEP_ONE.id) return;
    callAuthStepTwo({
      variables: {
        id: dataStepOne?.AUTH_STEP_ONE.id as string,
        token: formData.verificationCode,
        numero: numberToVerify
      }
    });
  };

  useEffect(() => {
    // send the message
    if (!numberToVerify) return;

    callAuthStepOne({
      variables: { numero: numberToVerify }
    });
  }, [callAuthStepOne, numberToVerify]);

  return (
    <View style={{ flex: 1, width: width }}>
      <SignInLayout title={'Enregistrement'}>
        <View
          style={{
            paddingHorizontal: theme.sizes.base * 2,
            paddingVertical: 30
          }}>
          <Text bold>Veuillez verifier le {numberToVerify}</Text>
          <Text small>
            Veuillez entrer le code de validation envoyé sur votre mobile.
          </Text>
          <Form
            {...{
              validation,
              setValue,
              register,
              errors
            }}>
            <InputValidator
              key={'verificationCode'}
              name="verificationCode"
              label={'Code de vérification'}
              phone
              placeholder="789485"
            />
            <Button
              disabled={called || !netWorkStatus}
              secondary
              onPress={(): void => {
                Keyboard.dismiss();
                handleSubmit(onSubmitCodeVerification)();
              }}>
              {loading ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text bold center>
                  Vérifier
                </Text>
              )}
            </Button>
          </Form>
          {called && data?.AUTH_STEP_TWO && !data?.AUTH_STEP_TWO.success && (
            <ModalItemInfos
              errorReporting
              information={'Erreur de validation'}
              description={
                'Vous avez introduit un code de vérification erroné. Vous serez redirigé pour le renseignement de votre numéro.'
              }
              timer={0.5}
              buttonMessage={'Fermer'}
              callBack={(): void => {
                navigation.goBack();
              }}
            />
          )}

          {error && (
            <ModalItemInfos
              errorReporting
              information={'Erreur de validation'}
              description={
                'Une erreur interne est survenue. Veuillez réessayer plus tard.'
              }
              timer={0.5}
              buttonMessage={'Fermer'}
              callBack={(): void => {
                navigation.goBack();
              }}
            />
          )}
          {called &&
          data?.AUTH_STEP_TWO.success &&
          data.AUTH_STEP_TWO.token &&
          data.AUTH_STEP_TWO.id &&
          data.AUTH_STEP_TWO.nom &&
          data.AUTH_STEP_TWO.prenom
            ? navigation.navigate('LoadedUserData', {
                id: data.AUTH_STEP_TWO.id,
                nom: data.AUTH_STEP_TWO.nom,
                prenom: data.AUTH_STEP_TWO.prenom,
                token: data.AUTH_STEP_TWO.token
              })
            : called && data?.AUTH_STEP_TWO.success
            ? navigation.navigate('RegisterUsername', {
                phoneNumberToVerify: numberToVerify
              })
            : null}
        </View>
      </SignInLayout>
    </View>
  );
};

export default RegisterPhoneNumberVerification;
