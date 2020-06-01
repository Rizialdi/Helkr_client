import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Layout } from './shareComponents';

export class Publier extends Component {
  render() {
    return (
      <Layout>
        <Text center>Je suis publie</Text>
      </Layout>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default Publier;
