import React, { Component } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Modal,
  ScrollView,
  View,
  Dimensions
} from "react-native";
import AwesomeAlert from 'react-native-awesome-alerts';

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";

const {width, height} = Dimensions.get('screen')

const VALID_NOM = "Diack";
const VALID_PRENOM = "Abou";
const VALID_NUMERO = "0780813564";

interface Props {
  navigation?: any
}

export default class Login extends Component<Props> {
  state = {
    nom: VALID_NOM,
    prenom: VALID_PRENOM,
    numero: VALID_NUMERO,
    errors: [],
    loading: false,
    showTerms: false,
    showConfirmation: false
  };

  renderTermsService() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showTerms}
        onRequestClose={() => this.setState({ showTerms: false })}
      >
        <Block
          padding={[20, 20]}
          space="between"
        >
          <Text style={{ fontFamily: 'josefinBold', fontSize: 25 }}>
            Politiques de services
          </Text>

          <ScrollView style={{ marginVertical: theme.sizes.padding }}>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              1. Your use of the Service is at your sole risk. The service is
              provided on an "as is" and "as available" basis.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              2. Support for Expo services is only available in English, via
              e-mail.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              3. You understand that Expo uses third-party vendors and hosting
              partners to provide the necessary hardware, software, networking,
              storage, and related technology required to run the Service.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              4. You must not modify, adapt or hack the Service or modify
              another website so as to falsely imply that it is associated with
              the Service, Expo, or any other Expo service.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              5. You may use the Expo Pages static hosting service solely as
              permitted and intended to host your organization pages, personal
              pages, or project pages, and for no other purpose. You may not use
              Expo Pages in violation of Expo's trademark or other rights or in
              violation of applicable law. Expo reserves the right at all times
              to reclaim any Expo subdomain without liability to you.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              6. You agree not to reproduce, duplicate, copy, sell, resell or
              exploit any portion of the Service, use of the Service, or access
              to the Service without the express written permission by Expo.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              7. We may, but have no obligation to, remove Content and Accounts
              containing Content that we determine in our sole discretion are
              unlawful, offensive, threatening, libelous, defamatory,
              pornographic, obscene or otherwise objectionable or violates any
              party's intellectual property or these Terms of Service.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              8. Verbal, physical, written or other abuse (including threats of
              abuse or retribution) of any Expo customer, employee, member, or
              officer will result in immediate account termination.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              9. You understand that the technical processing and transmission
              of the Service, including your Content, may be transferred
              unencrypted and involve (a) transmissions over various networks;
              and (b) changes to conform and adapt to technical requirements of
              connecting networks or devices.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              10. You must not upload, post, host, or transmit unsolicited
              e-mail, SMSs, or "spam" messages.
            </Text>
          </ScrollView>

          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button
              gradient
              onPress={() => this.setState({ showTerms: false })}
            >
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
  }

  hideConfirmation = () => {
    this.setState({
      showConfirmation: false
    });
  };

  renderConfirmation() {
    return (
      <View style={{ position: 'absolute', top: 0, height: height, width: width }}>
        <AwesomeAlert
          show={this.state.showConfirmation}
          showProgress={true}
          progressColor={theme.colors.primary}
          title="Nous allons vérifier le numéro de téléphone:"
          titleStyle={{ fontFamily: 'josefinRegular', fontSize: 16, color: 'black' }}
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
            this.props.navigation.navigate('Verification', {
              parent: 'Enregistrement',
              number: this.state.numero
            });
          }} />
      </View>
    )
  }

  handleLogin() {
    const { navigation } = this.props;
    const { nom, prenom, numero } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (nom !== VALID_NOM) {
      errors.push("nom");
    }
    if (prenom !== VALID_PRENOM) {
      errors.push("prenom");
    }
    if (numero !== VALID_NUMERO) {
      errors.push("numero");
    }

    this.setState({ errors, loading: false });

    if (!errors.length) { (() => this.setState({ showConfirmation: true }))()}

  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block>
          <Block padding={[40, theme.sizes.base * 2]}>
            <Text style={{ fontFamily: 'josefinBold', fontSize: 25 }}>
              Enregistrement
            </Text>
            <Block padding={[20, 0]}>
              <Input
                label="Nom"
                error={hasErrors("nom")}
                style={[styles.input, hasErrors("nom")]}
                defaultValue={this.state.nom}
                onChangeText={text => this.setState({ nom: text })}
              />
              <Input
                label="Prénom"
                error={hasErrors("prenom")}
                style={[styles.input, hasErrors("prenom")]}
                defaultValue={this.state.prenom}
                onChangeText={text => this.setState({ prenom: text })}
              />
              <Input
                phone
                label="Numéro"
                error={hasErrors("numero")}
                style={[styles.input, hasErrors("numero")]}
                defaultValue={this.state.numero}
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

              <Button onPress={() => navigation.navigate("Identification")}>
                <Text
                  gray
                  caption
                  center
                  style={{ textDecorationLine: "underline" }}
                >
                  Déja inscrit(e) ? <Text caption style={{ color: theme.colors.primary }}>Identifiez-vous</Text>
                </Text>
              </Button>
              <Text caption style={{ paddingTop: 15, fontFamily: 'josefinLight', fontSize: 12, textAlign: 'center' }}>Vous devez être agé(e) d’au moins 16 ans pour vous enregistrez. Apprenez plus sur nos <Text caption style={{ textDecorationLine: "underline", color: theme.colors.primary }} onPress={() => this.setState({ showTerms: true })}>politiques</Text></Text>
            </Block>
            </Block>
          {this.renderConfirmation()}
          {this.renderTermsService()}
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center"
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