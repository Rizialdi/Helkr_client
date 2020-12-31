import React, { SFC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Dimensions, Keyboard, View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import { theme } from '../../constants';
import { useStoreState } from '../../models';
import { MainStackParamList } from '../../navigation/Routes';
import { Button, ModalItemSignUp, Text } from '../sharedComponents';
import { Form, InputValidator, SignInLayout, validation } from './components';
import { FormData } from './components/validation';

const { width } = Dimensions.get('screen');

interface Props {
  navigation: StackNavigationProp<MainStackParamList>;
}
const RegisterPhoneNumber: SFC<Props> = ({ navigation }) => {
  const { handleSubmit, register, setValue, errors } = useForm<FormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [phoneNumberToVerify, setPhoneNumberToVerify] = useState<string | null>(
    null
  );

  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);

  const onSubmitNumberVerification = (data: FormData): void => {
    setOpenAlert(true);
    data.number && setPhoneNumberToVerify(data.number);
  };

  return (
    <View style={{ flex: 1, width: width }}>
      <SignInLayout title={'Enregistrement'}>
        <View
          style={{
            paddingHorizontal: theme.sizes.base * 2,
            paddingVertical: 30
          }}>
          <Text bold>Veuillez saisir votre numéro de téléphone</Text>
          <Text small>
            Veuillez entrer votre numéro. {`\n`}Helkr va envoyer un SMS afin de
            vérifier votre numéro de téléphone.
          </Text>
          <Form {...{ register, setValue, validation, errors }}>
            <InputValidator
              key={'number'}
              name="number"
              label={'Numéro'}
              phone
              placeholder="0024107558164"
            />
            <Button
              disabled={openAlert || !netWorkStatus}
              secondary
              onPress={(): void => {
                Keyboard.dismiss();
                handleSubmit(onSubmitNumberVerification)();
              }}>
              {openAlert ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text bold header center>
                  Valider
                </Text>
              )}
            </Button>
          </Form>

          {openAlert && (
            <ModalItemSignUp
              information={'Vérification de numéro'}
              description={`Nous allons vérifier le numéro de téléphone ${phoneNumberToVerify} \nVoulez-vous continuer ? `}
              timer={0.5}
              buttonMessage={'Continuer'}
              callBack={(): void => {
                phoneNumberToVerify &&
                  navigation.navigate('RegisterPhoneNumberVerification', {
                    phoneNumberToVerify
                  });
                setOpenAlert(false);
              }}
              aroundClick={(): void => setOpenAlert(false)}
            />
          )}
        </View>
      </SignInLayout>
    </View>
  );
};

export default RegisterPhoneNumber;
