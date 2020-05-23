import React, { useState, useEffect, useContext } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
  Text,
  AsyncStorage,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { TouchableHighlight } from 'react-native-gesture-handler';

import { UserContext, userContextInterface } from '../userContext';

export const ADD_USER = gql`
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

export const QUERY_USER = gql`
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

interface userInterface {
  id: string;
  prenom: string;
  nom: string;
}

interface userData {
  token: string;
  user: userInterface;
}

export default () => {
  const [id, setId] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [Data, setData] = useState<userData>(null);
  const [Loading, setLoading] = useState<boolean>(false);
  const [codeSent, sesetCodeSent] = useState<string>('');
  const [Error, setError] = useState(null);

  const [addUserMutation] = useMutation(ADD_USER);
  const { client } = useQuery(QUERY_USER);

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
      setLoading(false);
    } catch (error) {
      setError('Ajout Utilisateur impossible');
      setLoading(false);
    }
  };

  const queryUser = async (numero: string) => {
    try {
      //@ts-ignore
      if (isNaN(numero)) {
        setError('Numero invalide');
        return null;
      }
      const {
        data: { getUserInfo },
        loading
      } = await client.query({
        query: QUERY_USER,
        variables: { numero }
      });

      getUserInfo && setData(getUserInfo);
      loading && setLoading(loading);
    } catch (_) {
      setError('Utilisateur non existant');
      setLoading(false);
    }
  };
  const { user, setUser } = useContext(UserContext);
  const storeCredentials = ({ token, user: { id, prenom } }) => {
    //   (async () => {
    //     try {
    //       await AsyncStorage.clear();
    //       await AsyncStorage.multiSet([
    //         ['token', token],
    //         ['prenom', prenom],
    //         ['id', .id]
    //       ]);
    //     } catch (error) {
    //       throw new Error('Credentials creation failed');
    //     }
    //   })();
    setUser({ id, prenom, token });
  };

  useEffect(() => {
    Data && !Loading && storeCredentials(Data);
  }, [Data, Loading]);

  console.log(user);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <View
          style={{
            alignItems: 'center',
            alignContent: 'center'
          }}
        >
          {Loading && <ActivityIndicator size="large" color="green" />}
          {Error && <Text>{`Something crashed ${Error}`}</Text>}
          <Text>La vie est belle</Text>
          <TouchableHighlight onPress={() => queryUser('0780813564')}>
            <Text>Touche moi</Text>
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
