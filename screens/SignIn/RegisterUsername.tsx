import React, { useEffect } from 'react';
import { View, ActivityIndicator, Dimensions, Keyboard } from 'react-native';
import { Button, Layout, Text } from '../sharedComponents';
import { theme } from '../../constants';
import { Form, InputValidator, validation } from './components';
import { FormData } from './components/validation';
import { useForm } from 'react-hook-form';
import {
  StackNavigationInterface,
  MainStackParamList
} from '../../navigation/Routes';
import { useRegisterUserMutation } from '../../graphql';
import { storeCredentials } from '../../utils';
import { useStoreActions, useStoreState } from '../../models';

const { width } = Dimensions.get('screen');

const RegisterUsername = ({
  navigation,
  route
}: StackNavigationInterface<
  MainStackParamList,
  'RegisterUsername'
>): JSX.Element => {
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);

  const [registerUser, { loading, data, error }] = useRegisterUserMutation({
    fetchPolicy: 'no-cache'
  });

  const { setUser } = useStoreActions(actions => actions.User);

  const { handleSubmit, register, setValue, errors } = useForm<FormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

  const numero = route.params.phoneNumberToVerify;

  const onSubmitName = (formData: FormData): void => {
    const { nom, prenom } = formData;
    numero && registerUser({ variables: { nom, prenom, numero } });
  };

  useEffect(() => {
    if (data && data.registerUser.token) {
      const {
        token,
        user: { id, prenom }
      } = data.registerUser;
      storeCredentials({ id, prenom, token });
      setUser({ id, prenom, token });
    }
  }, [data, setUser]);

  console.log('error', error);
  return (
    <View style={{ flex: 1, width: width }}>
      <Layout title={'Enregistrement'}>
        <View
          style={{
            paddingHorizontal: theme.sizes.base * 2,
            paddingVertical: 30
          }}>
          <Text bold>Veuillez saisir vos nom(s) et prénom(s)</Text>
          <Text small>
            Veuillez entrer les noms et prénoms contenus sur votre pièce
            d'identité. {`\n`}Helkr ne partage aucune information avec des
            entités tièrces.
          </Text>
          <Form
            {...{
              validation,
              register,
              setValue,
              errors
            }}>
            <InputValidator
              key={'prenom'}
              name="nom"
              label={'Nom'}
              placeholder="Obame"
            />
            <InputValidator
              key={'prenom'}
              name="prenom"
              label={'Prénom'}
              placeholder="Charles"
            />
            <Button
              disabled={loading || !netWorkStatus}
              secondary
              onPress={(): void => {
                Keyboard.dismiss();
                handleSubmit(onSubmitName)();
              }}>
              {loading ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text bold center>
                  Je crée mon compte
                </Text>
              )}
            </Button>
          </Form>
          {error && (
            <Text small center vertical={[10]}>
              Une erreur est survenue sur le réseau. Veuillez réessayer plus
              tard
            </Text>
          )}
          {data?.registerUser.token &&
            navigation.navigate('PrincipalView', {
              screen: 'Accueil'
            })}
        </View>
      </Layout>
    </View>
  );
};

export default RegisterUsername;
