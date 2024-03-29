import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, Keyboard, View } from 'react-native';

import { theme } from '../../constants';
import { useStoreActions, useStoreState } from '../../models';
import {
  MainStackParamList,
  StackNavigationInterface
} from '../../navigation/Routes';
import { storeCredentials } from '../../utils';
import { Button, Text } from '../sharedComponents';
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
            Nom(s): <Text bold>{nom}</Text>
          </Text>
          <Text vertical={[20, 10]}>
            Prenom(s): <Text bold>{prenom}</Text>
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
        <Text
          small
          center
          style={{
            paddingTop: 15,
            textAlign: 'center'
          }}>
          En appuyant sur Confirmer, vous acceptez nos politiques de services.
        </Text>
      </SignInLayout>
    </View>
  );
};

export default LoadedUserData;
