import React, { useState } from 'react';
import { View, ActivityIndicator, Dimensions, Keyboard } from 'react-native';
import { Button, Text } from '../sharedComponents';
import { theme } from '../../constants';
import { storeCredentials } from '../../utils';
import {
  StackNavigationInterface,
  MainStackParamList
} from '../../navigation/Routes';
import { useStoreActions, useStoreState } from '../../models';
import { SignInLayout } from './components';

const { width } = Dimensions.get('screen');

const LoadedUserData = ({
  navigation,
  route
}: StackNavigationInterface<
  MainStackParamList,
  'LoadedUserData'
>): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const { token, id, nom, prenom } = route.params;
  const { setUser } = useStoreActions(actions => actions.User);
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);

  return (
    <View style={{ flex: 1, width: width }}>
      <SignInLayout title={'Vérification'}>
        <View
          style={{
            paddingHorizontal: theme.sizes.base * 2,
            paddingVertical: 30
          }}>
          <Text bold>Veuillez vérifier votre identité</Text>
          <Text small>
            En cas d'erreur sur vos informations,veuillez nous contacter. {`\n`}
            Helkr ne partage aucune information avec des entités tièrces.
          </Text>
          <Text vertical={[20, 0]}>
            Noms: <Text bold>{nom}</Text>
          </Text>
          <Text vertical={[20, 10]}>
            Prenoms: <Text bold>{prenom}</Text>
          </Text>
          <Button
            disabled={loading || !netWorkStatus}
            secondary
            onPress={(): void => {
              Keyboard.dismiss();
              setLoading(!loading);
              storeCredentials({ id, prenom, token });
              setUser({ id, prenom, token });
              setLoading(!loading);
              navigation.navigate('PrincipalView', {
                screen: 'Accueil'
              });
            }}>
            {loading ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text bold center>
                Confirmer
              </Text>
            )}
          </Button>
        </View>
      </SignInLayout>
    </View>
  );
};

export default LoadedUserData;