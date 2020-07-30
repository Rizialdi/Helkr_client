import React from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Modal,
  View,
  Dimensions
} from 'react-native';

import gql from 'graphql-tag';
import Toast from 'react-native-easy-toast';
import AwesomeAlert from 'react-native-awesome-alerts';
import ValidationComponent from 'react-native-form-validator';

import { Button, Block, Input } from '../components';
import { Text, TermsOfServices } from './sharedComponents';
import { theme } from '../constants';

import { WEB_SERVER_ADDRESS, WEB_SERVER_PORT } from '../config';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('screen');

const QueryUser = gql`
  query user($numero: String!) {
    user(numero: $numero) {
      id
    }
  }
`;

class Form extends ValidationComponent {
  state: State = {
    nom: '',
    prenom: '',
    numero: '',
    loading: false,
    showTerms: false,
    errorMessage: false,
    showConfirmation: false
  };

  render() {
    //@ts-ignore
    const { navigation } = this.props;
    const { loading } = this.state;
    const hasErrors = key =>
      this.isFieldInError(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block>
          <Block padding={[40, theme.sizes.base * 2]}>
            <Text style={{ fontFamily: 'josefinBold', fontSize: 25 }}>
              Enregistrement
            </Text>
            <Block padding={[20, 0]}>
              <Input
                ref="nom"
                label="Nom"
                placeholder="Nom"
                error={hasErrors('nom')}
                style={[styles.input, hasErrors('nom')]}
                onChangeText={text => this.setState({ nom: text })}
              />
              <Input
                ref="prenom"
                label="Prénom"
                placeholder="Prenom"
                error={hasErrors('prenom')}
                style={[styles.input, hasErrors('prenom')]}
                onChangeText={text => this.setState({ prenom: text })}
              />
              <Input
                phone
                ref="numero"
                label="Numéro"
                placeholder="Numero"
                error={hasErrors('numero')}
                style={[styles.input, hasErrors('numero')]}
                onChangeText={text => this.setState({ numero: text })}
              />
              <Button gradient onPress={() => this.handleLogin()}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                    Enregistrement
                  </Text>
                )}
              </Button>
              <Button onPress={() => navigation.navigate('Identification')}>
                <Text
                  gray
                  caption
                  center
                  style={{ textDecorationLine: 'underline' }}>
                  Déja inscrit(e) ?{' '}
                  <Text caption style={{ color: theme.colors.primary }}>
                    Identifiez-vous
                  </Text>
                </Text>
              </Button>
              <TouchableOpacity
                onPress={() => this.setState({ showTerms: true })}>
                <Text
                  caption
                  style={{
                    paddingTop: 15,
                    fontFamily: 'josefinLight',
                    fontSize: 12,
                    textAlign: 'center'
                  }}>
                  Vous devez être agé(e) d’au moins 16 ans pour vous
                  enregistrez. Apprenez plus sur nos{' '}
                  <Text
                    caption
                    style={{
                      textDecorationLine: 'underline',
                      color: theme.colors.primary
                    }}>
                    politiques
                  </Text>
                </Text>
              </TouchableOpacity>
            </Block>
          </Block>
          {this.renderTermsService()}
          {this.state.showConfirmation && this.renderConfirmation()}
          {this.state.errorMessage &&
            //@ts-ignore
            this.refs.toast.show(this.getErrorMessages().split('\n')[0])}
        </Block>
        <Toast ref="toast" />
      </KeyboardAvoidingView>
    );
  }

  renderTermsService() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showTerms}
        onRequestClose={() => this.setState({ showTerms: false })}>
        <Block padding={[20, 20]} space="between">
          <Text style={{ fontFamily: 'josefinBold', fontSize: 25 }}>
            Politiques de services
          </Text>
          <TermsOfServices />
          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button
              gradient
              onPress={() => this.setState({ showTerms: false })}>
              <Text center white>
                Je comprends
              </Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    );
  }

  showConfirmation = () => {
    this.setState({
      showConfirmation: true
    });
  };

  hideConfirmation = () => {
    this.setState({
      showConfirmation: false
    });
  };

  renderConfirmation() {
    const { nom, prenom, numero } = this.state;
    return (
      <View
        style={{ position: 'absolute', top: 0, height: height, width: width }}>
        <AwesomeAlert
          show={this.state.showConfirmation}
          showProgress={true}
          progressColor={theme.colors.primary}
          title="Nous allons vérifier le numéro de téléphone:"
          titleStyle={{
            fontFamily: 'josefinRegular',
            fontSize: 16,
            color: 'black'
          }}
          message={this.state.numero}
          messageStyle={{ fontWeight: 'bold', color: 'black' }}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Modifier"
          cancelButtonStyle={{ fontWeight: 'bold', padding: 10, margin: 5 }}
          confirmText="Continuer"
          confirmButtonColor={theme.colors.primary}
          onCancelPressed={() => {
            this.hideConfirmation();
          }}
          onConfirmPressed={() => {
            this.hideConfirmation();
            //@ts-ignore
            this.props.navigation.navigate('Verification', {
              parent: 'Enregistrement',
              nom: nom,
              prenom: prenom,
              numero: numero
            });
          }}
        />
      </View>
    );
  }

  handleLogin() {
    const { numero } = this.state;
    Keyboard.dismiss();
    this.setState({ loading: true });

    // validate input sanity and format
    this.validate({
      nom: { minlength: 3, maxlength: 15, required: true },
      prenom: { minlength: 3, maxlength: 15, required: true },
      numero: {
        numbers: true,
        // minlength: 8,
        // maxlength: 8,
        required: true
      }
    });

    if (!this.isFormValid()) {
      (() => this.setState({ errorMessage: true }))();
      setTimeout(
        () => this.setState({ loading: false, errorMessage: false }),
        500
      );
    }

    if (this.isFormValid()) {
      (() => {
        //validate with some backend API
        fetch(`http://${WEB_SERVER_ADDRESS}:${WEB_SERVER_PORT}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: QueryUser,
            variables: { numero }
          })
        })
          .then(response => response.json())
          .then(responseAsJson => {
            // if numero alreay exist in the database
            if (!responseAsJson.errors) {
              setTimeout(() => this.setState({ loading: false }), 500);
              //@ts-ignore
              return this.refs.toast.show(
                'Un compte ayant ce numéro existe déja'
              );
            } else {
              this.setState({ showConfirmation: true, loading: false });
            }
          })
          .catch(error => {
            throw new Error('Unable to check user existence');
          });
      })();
    }
  }
}

export default ({ navigation }) => {
  //@ts-ignore
  return <Form deviceLocale="fr" navigation={navigation} />;
};

type State = {
  nom: string;
  prenom: string;
  numero: string;
  errorMessage: boolean;
  loading: boolean;
  showTerms: boolean;
  showConfirmation: boolean;
};

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
