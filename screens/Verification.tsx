import React, { Component } from 'react'
import { View, 
  KeyboardAvoidingView, 
  StyleSheet, 
  ActivityIndicator,
  Keyboard } from 'react-native'
import Toast from 'react-native-simple-toast';

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";

interface Props {
  route?: any,
  navigation?: any
}

export class Verification extends Component<Props> {
  state = {
    id: '',
    token: '',
    status: '',
    loading: false,
    showTerms: false,
    CodeSent: false
  };

  handleVerification() {
    Keyboard.dismiss()
    this.setState({ loading: true })
    this.setState({ loading: false })
    fetch('http://10.53.18.97:4000/api/v1/register-step2', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
        id: this.state.id,
        token: this.state.token
      })
    }).then(res => res.json())
      .then(res => this.setState({ status: res.status },
       () => {
         // TODO add a case when the token sent is invalid
        if (this.state.status !== 'verified')
         return Toast.show('Verifiez votre code')
      }))
      .catch((error) => {
        return new Error('Verification failed')
      });
  }

  sendRequest = async (numero) => {
    fetch('http://10.53.18.97:4000/api/v1/register-step1', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        numero: numero
      })
    }).then(res => res.json())
      .then(res => this.setState({ id : res.id}))
      .catch((error) => {
        return new Error('Message not sent')
      });
    this.setState({ CodeSent: true})
  }

  render() {
    const { loading, CodeSent } = this.state;
    const { numero } = this.props.route.params
    setTimeout(() => { if (!CodeSent) { this.sendRequest(numero) }}, 500)
    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block padding={[40, theme.sizes.base * 2]}>
          <Text style={{ fontFamily: 'josefinBold', fontSize: 25 }}>
            {this.props.route.params.parent}
          </Text>
          <Block padding={[60, 0]}>
            <Text style={{ fontFamily: 'josefinRegular', fontSize: 16}}>Un message vient d’etre envoyé au <Text bold>{this.props.route.params.number}.</Text></Text>
            <Text style={{ fontFamily: 'josefinRegular', fontSize: 16 }}>Entrez le code de vérification en dessous:</Text>
            <Input
              phone
              onChangeText={text => this.setState({ token: text })}
            />
            <Button gradient onPress={() => this.handleVerification()}>
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
        {(this.state.status === 'verified') && this.props.navigation.navigate('PrincipalView')}
      </KeyboardAvoidingView>
    )
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

export default Verification
