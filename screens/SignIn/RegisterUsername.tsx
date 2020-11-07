import React, { useEffect, useState, useMemo } from 'react';
import { View, ActivityIndicator, Dimensions, Keyboard } from 'react-native';
import { Button, Text } from '../sharedComponents';
import { theme, mocks } from '../../constants';
import { Form, InputValidator, validation, SignInLayout } from './components';
import { FormData } from './components/validation';
import { useForm } from 'react-hook-form';
import {
  StackNavigationInterface,
  MainStackParamList
} from '../../navigation/Routes';
import { useRegisterUserMutation } from '../../graphql';
import { storeCredentials } from '../../utils';
import { useStoreActions, useStoreState } from '../../models';
import ModalSelector from 'react-native-modal-selector';

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

  const [cities, setCities] = useState<Array<any>>(['']);
  const [city, setCity] = useState<string>('');

  const { setUser } = useStoreActions(actions => actions.User);

  const { handleSubmit, register, setValue, errors } = useForm<FormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

  const numero = route.params.phoneNumberToVerify;

  const onSubmitName = (formData: FormData): void => {
    const { nom, prenom } = formData;
    numero &&
      registerUser({ variables: { nom, prenom, numero, address: city } });
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

  useMemo(() => {
    setCities(mocks.cities);
  }, []);

  return (
    <View style={{ flex: 1, width: width }}>
      <SignInLayout title={'Enregistrement'}>
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
            <ModalSelector
              data={cities}
              cancelTextStyle={{ fontWeight: 'bold' }}
              optionTextStyle={{
                color: theme.colors.black,
                fontSize: theme.fonts.body.fontSize,
                fontWeight: 'bold'
              }}
              optionStyle={{ padding: 20 }}
              optionContainerStyle={{ backgroundColor: '#fff' }}
              cancelText={'Fermer'}
              cancelStyle={{
                backgroundColor: theme.colors.secondary,
                padding: 15
              }}
              scrollViewAccessibilityLabel={'Scrollable options'}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              onChange={option => setCity(option.label)}>
              <InputValidator
                key={'city'}
                name={'city'}
                label={'Ville'}
                value={city}
                placeholder={'Libreville'}
              />
            </ModalSelector>

            <Button
              disabled={loading || !netWorkStatus || !city}
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
      </SignInLayout>
    </View>
  );
};

export default RegisterUsername;
