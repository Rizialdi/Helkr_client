import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { SFC, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native';
import Toast from 'react-native-easy-toast';

import { Block, Button, Input } from '../components';
import { theme } from '../constants';
import { useStoreActions } from '../models';
import { Text } from './shareComponents';

const Verification: SFC<Props> = ({
  navigation,
  route: {
    params: { nom, prenom, numero, parent }
  }
}) => {
  const toastEl = useRef(null);
  const [Id, setId] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [Data, setData] = useState<userData>(null);
  const [Loading, setLoading] = useState<boolean>(false);
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const [Error, setError] = useState(null);
  const [token, setToken] = useState<string>('');

  const [addUserMutation] = useMutation(ADD_USER);
  const client = useApolloClient();

  const handle_step_one = async (numero) => {
    setLoading(true);
    setCodeSent(true);

    try {
      const {
        data: {
          twoWFA_step_one: { id, status }
        }
      } = await client.query({
        query: AUTH_STEP_ONE,
        variables: { numero },
        fetchPolicy: 'network-only'
      });
      id && setId(id);
      status && setStatus(status);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handle_step_two = async (id, token) => {
    setLoading(true);
    try {
      const {
        data: {
          twoWFA_step_two: { success }
        }
      } = await client.query({
        query: AUTH_STEP_TWO,
        variables: { id, token }
      });
      return success;
    } catch (error) {
      setError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handle_step_one(numero);
  }, []);

  const addUser = async (nom: string, prenom: string, numero: string) => {
    setLoading(true);
    try {
      const { data } = await addUserMutation({
        variables: {
          nom,
          prenom,
          numero
        }
      });
      data && setData(data);
    } catch (_) {
      setError('Ajout Utilisateur impossible');
    } finally {
      setLoading(false);
    }
  };

  const queryUser = async (numero: string) => {
    setLoading(true);
    try {
      //@ts-ignore
      if (isNaN(numero)) {
        setError('Numero invalide');
        return null;
      }
      const {
        data: { getUserInfo }
      } = await client.query({
        query: QUERY_USER_INFO,
        variables: { numero }
      });
      getUserInfo && setData(getUserInfo);
    } catch (_) {
      setError('Utilisateur non existant');
    } finally {
      setLoading(false);
    }
  };

  const { setUser } = useStoreActions((actions) => actions.User);

  //TODO Test this function
  const storeCredentials = ({ token, user: { id, prenom } }) => {
    (async () => {
      try {
        await AsyncStorage.clear();
        await AsyncStorage.multiSet([
          ['id', id],
          ['token', token],
          ['prenom', prenom]
        ]);
      } catch (error) {
        throw new Error('Credentials creation failed');
      }
    })();
    setUser({ id, prenom, token });
  };

  const handleVerification = async () => {
    setLoading(true);
    Keyboard.dismiss();

    if (status !== 'sent') {
      setError('Une erreur est arrivée');
      setTimeout(() => navigation.navigate('Enregistrement'), 2000);
    }

    const success = await handle_step_two(Id, token);

    if (!success) {
      setError('Code entré erroné');
      setTimeout(() => navigation.navigate('Enregistrement'), 2000);
    }

    if (nom || prenom) {
      addUser(nom, prenom, numero);
    } else {
      queryUser(numero);
    }
    setLoading(false);
  };

  useEffect(() => {
    Data && !Loading && storeCredentials(Data);
  }, [Data, Loading]);

  return (
    <KeyboardAvoidingView style={styles.login} behavior="padding">
      <Block padding={[40, theme.sizes.base * 2]}>
        <Text style={{ fontFamily: 'josefinBold', fontSize: 25 }}>
          {parent}
        </Text>
        <Block padding={[60, 0]}>
          <Text style={{ fontFamily: 'josefinRegular', fontSize: 16 }}>
            Un message vient d’etre envoyé au <Text bold>{numero}</Text>
          </Text>
          <Text style={{ fontFamily: 'josefinRegular', fontSize: 16 }}>
            Entrez le code de vérification en dessous: error {Error}
          </Text>
          <Input phone onChangeText={(text) => setToken(text)} />
          <Button gradient onPress={() => handleVerification()}>
            {Loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold white center>
                Vérifier
              </Text>
            )}
          </Button>
        </Block>
        {Error && toastEl.current.show(Error)}
        <Toast ref={toastEl} />
      </Block>
    </KeyboardAvoidingView>
  );
};

const ADD_USER = gql`
  mutation Enregistrement($nom: String!, $prenom: String!, $numero: String!) {
    registerUser(nom: $nom, prenom: $prenom, numero: $numero) {
      token
      user {
        id
        prenom
      }
    }
  }
`;

const QUERY_USER_INFO = gql`
  query Recherche($numero: String!) {
    getUserInfo(numero: $numero) {
      token
      user {
        id
        prenom
      }
    }
  }
`;

const AUTH_STEP_ONE = gql`
  query AUTH_STEP_ONE($numero: String) {
    twoWFA_step_one(numero: $numero) {
      id
      status
    }
  }
`;

const AUTH_STEP_TWO = gql`
  query AUTH_STEP_TWO($id: String!, $token: String!) {
    twoWFA_step_two(id: $id, token: $token) {
      success
    }
  }
`;

interface userInterface {
  id: string;
  prenom: string;
  nom: string;
}

interface userData {
  token: string;
  user: userInterface;
}

interface paramsInterface {
  nom: string;
  prenom: string;
  numero: string;
  parent: string;
}
interface routeInterface {
  params: paramsInterface;
}
interface Props {
  route: routeInterface;
  navigation: any;
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  }
});

export default Verification;
