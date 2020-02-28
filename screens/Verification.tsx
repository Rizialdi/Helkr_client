import React, { Component } from 'react'
import { View, 
  KeyboardAvoidingView, 
  StyleSheet, 
  ActivityIndicator,
  Keyboard } from 'react-native'

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";

interface Props {
  route?: any,
  navigation?: any
}

const VALID_CODE = "0780813564";

export class Verification extends Component<Props> {
  state = {
    validationCode: VALID_CODE,
    loading: false,
    showTerms: false,
  };

  handleVerification() {
    Keyboard.dismiss();
    this.setState({ loading: true });
    this.props.navigation.navigate('PrincipalView')
    this.setState({ loading: false });
  }
  render() {
    const { loading } = this.state;
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
              onChangeText={text => this.setState({ numero: text })}
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
