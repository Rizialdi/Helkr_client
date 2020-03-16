import React, { Component } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
  Modal,
  ScrollView,
  View
} from "react-native";
import gql from 'graphql-tag'
import Toast from 'react-native-simple-toast';
import AwesomeAlert from 'react-native-awesome-alerts';
import ValidationComponent from 'react-native-form-validator';

const { width, height } = Dimensions.get('screen')

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";
import { IP_ADDRESS } from "../config"

const QueryUser = gql`
  query user($numero: String!) {
    user (numero: $numero) {
      id
    }
}
`

class Form extends ValidationComponent {
  state = {
    numero: '',
    errorMessage: false,
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
          titleStyle={{ fontFamily: 'josefinRegular', fontSize: 16, color: 'black'}}
          message={this.state.numero}
          messageStyle={{fontWeight: 'bold', color:'black'}}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Modifier"
          cancelButtonStyle={{fontWeight: 'bold', padding: 10, margin: 5}}
          confirmText="Continuer"
          confirmButtonColor={theme.colors.primary}
          onCancelPressed={() => {
            this.hideConfirmation();
          }}
          onConfirmPressed={() => {
            this.hideConfirmation();
            this.props.navigation.navigate('Verification', {
              parent: 'Identification',
              number: this.state.numero
            })
          }} />
      </View>
    )
  }

  handleLogin() {
    const { numero } = this.state
    Keyboard.dismiss();
    this.setState({ loading: true });
    // check with backend API or with some static data
    this.validate({
      numero: { numbers: true, minlength: 8, maxlength: 8, required: true },
    });

    if (!this.isFormValid()) { (() => this.setState({ errorMessage: true }))() }

    setTimeout(() => this.setState({ loading: false, errorMessage: false }), 500)

    if (this.isFormValid()) {
      (() => {
        //validate with some backend API
        fetch(`http://${IP_ADDRESS}:4000`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: QueryUser,
            variables: { numero }
          }),
        }).then(response => response.json())
          .then(responseAsJson => {
            // if numero alreay exist in the database
            if (responseAsJson.errors) {
              this.setState({ loading: false })
              Toast.show("Aucun compte n'est rattaché a ce numéro")}
            else {
              this.setState({ loading: false, showConfirmation: true })
            }
          })
          .catch(error => { throw new Error('Unable to check user existence') })
      })()
    }
  }

  render() {
    const { loading } = this.state;
    const hasErrors = key => (this.isFieldInError(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block padding={[40, theme.sizes.base * 2]}>
          <Text style={{ fontFamily: 'josefinBold', fontSize: 25 }}>
            Identification
          </Text>
          <Block padding={[60, 0]}>
            <Input
              phone
              ref="numero"
              label="Numéro"
              placeholder="Numero"
              error={hasErrors("numero")}
              style={[styles.input, hasErrors("numero")]}
              onChangeText={text => this.setState({ numero: text })}
            />
            <Button gradient onPress={() => this.handleLogin()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                  <Text bold white center>
                    Identification
                </Text>
                )}
            </Button>
            <Text caption style={{ paddingTop: 15, fontFamily: 'josefinLight', fontSize: 12, textAlign: 'center' }}>Vous devez être agé(e) d’au moins 16 ans pour vous enregistrez. Apprenez plus sur nos <Text caption style={{ textDecorationLine: "underline", color: theme.colors.primary }} onPress={() => this.setState({ showTerms: true })}>politiques</Text></Text>
          </Block>
          {this.renderTermsService()}
          {!this.state.errorMessage && this.renderConfirmation()}
          {this.state.errorMessage && Toast.show(this.getErrorMessages().split('\n')[0])}
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

export default ({ navigation }) => {
  return (
    <Form deviceLocale="fr" navigation={navigation} />
  )
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