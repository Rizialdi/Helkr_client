import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
  AsyncStorage
} from 'react-native';
import gql from 'graphql-tag';
import Toast from 'react-native-easy-toast';

import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';
import { WEB_SERVER_ADDRESS, WEB_SERVER_PORT } from '../config';

type Props = {
  route?: any;
  navigation?: any;
};

enum gql_query {
  registerUser = 'registerUser',
  getUserInfo = 'getUserInfo'
}

type Registring = {
  [key in gql_query]?: {
    token: string;
    user: { id: string; prenom: string; nom: string };
  };
};

type State = {
  id: string;
  token: string;
  status: string;
  data: Registring;
  loading: boolean;
  CodeSent: boolean;
  mutateDataError: null;
};

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

export class Verification extends Component<Props, State> {
  state: State = {
    id: '',
    token: '',
    status: '',
    data: null,
    loading: false,
    CodeSent: false,
    mutateDataError: null
  };

  storeCredentials = ({ token, user }) => {
    (async () => {
      try {
        await AsyncStorage.clear();
        await AsyncStorage.multiSet([
          ['token', token],
          ['prenom', user.prenom],
          ['id', user.id]
        ]);
      } catch (error) {
        throw new Error('Credentials creation failed');
      }
    })();
  };
  mutateData = ({ nom, prenom, numero }) => {
    this.setState({ loading: true, mutateDataError: null }, () => {
      fetch(`http://${WEB_SERVER_ADDRESS}:${WEB_SERVER_PORT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: ADD_USER,
          variables: { nom, prenom, numero }
        })
      })
        .then((response) => response.json())
        .then((responseAsJson) => {
          if (responseAsJson.error) {
            this.setState({
              loading: false,
              mutateDataError: responseAsJson.errors[0],
              data: responseAsJson.data
            });
          } else {
            this.setState(
              {
                loading: false,
                mutateDataError: null,
                data: responseAsJson.data
              },
              () => {
                this.storeCredentials(this.state.data.registerUser);
              }
            );
          }
        })
        .catch((error) => {
          this.setState({
            loading: false,
            mutateDataError: error,
            data: null
          });
          return new Error('User adding failed');
        });
    });
  };

  queryData = ({ numero }) => {
    this.setState({ loading: true, mutateDataError: null }, () => {
      fetch(`http://${WEB_SERVER_ADDRESS}:${WEB_SERVER_PORT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: QUERY_USER,
          variables: { numero }
        })
      })
        .then((response) => response.json())
        .then((responseAsJson) => {
          if (responseAsJson.error) {
            this.setState({
              loading: false,
              mutateDataError: responseAsJson.errors[0],
              data: responseAsJson.data
            });
          } else {
            console.log('darta', responseAsJson);
            this.setState(
              {
                loading: false,
                mutateDataError: null,
                data: responseAsJson.data
              },
              () => {
                this.storeCredentials(this.state.data.getUserInfo);
              }
            );
          }
        })
        .catch((error) => {
          this.setState({
            loading: false,
            mutateDataError: error,
            data: null
          });
          return new Error('User adding failed');
        });
    });
  };

  handleVerification({ nom, prenom, numero }) {
    Keyboard.dismiss();
    this.setState({ loading: true });
    // TODO Change this Ip address
    fetch(
      `http://${WEB_SERVER_ADDRESS}:${WEB_SERVER_PORT}/api/v1/register-step2`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.state.id,
          token: this.state.token
        })
      }
    )
      .then((res) => res.json())
      .then((res) =>
        this.setState({ status: res.status }, () => {
          // TODO add a case when the token sent is invalid
          if (this.state.status !== 'verified') {
            //@ts-ignore
            this.refs.toast.show('Code de validation erroné');
            setTimeout(
              () => this.props.navigation.navigate('Enregistrement'),
              3000
            );
          }

          if (nom && prenom && this.state.status === 'verified') {
            this.mutateData({ nom, prenom, numero });
            this.state.loading &&
              this.props.navigation.navigate('PrincipalView');
          }

          if (!nom && this.state.status === 'verified') {
            this.queryData({ numero });
            this.state.loading &&
              this.props.navigation.navigate('PrincipalView');
          }
        })
      )
      .catch((error) => {
        return new Error('Verification failed');
      });
  }

  sendRequest = async (numero) => {
    fetch(
      `http://${WEB_SERVER_ADDRESS}:${WEB_SERVER_PORT}/api/v1/register-step1`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          numero: numero
        })
      }
    )
      .then((res) => res.json())
      .then((res) => this.setState({ id: res.id }))
      .catch((error) => {
        return new Error('Message not sent');
      });
    this.setState({ CodeSent: true });
  };

  render() {
    const { loading, CodeSent } = this.state;
    const { nom, prenom, numero } = this.props.route.params;
    setTimeout(() => {
      if (!CodeSent) {
        this.sendRequest(numero);
      }
    }, 500);
    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block padding={[40, theme.sizes.base * 2]}>
          <Text style={{ fontFamily: 'josefinBold', fontSize: 25 }}>
            {this.props.route.params.parent}
          </Text>
          <Block padding={[60, 0]}>
            <Text style={{ fontFamily: 'josefinRegular', fontSize: 16 }}>
              Un message vient d’etre envoyé au{' '}
              <Text bold>{this.props.route.params.number}.</Text>
            </Text>
            <Text style={{ fontFamily: 'josefinRegular', fontSize: 16 }}>
              Entrez le code de vérification en dessous:
            </Text>
            <Input
              phone
              onChangeText={(text) => this.setState({ token: text })}
            />
            <Button
              gradient
              onPress={() => this.handleVerification({ nom, prenom, numero })}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Vérifier
                </Text>
              )}
            </Button>
          </Block>
        </Block>
        <Toast ref="toast" />
      </KeyboardAvoidingView>
    );
  }
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
