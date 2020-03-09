import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import gql from 'graphql-tag';
import { useQuery } from "@apollo/react-hooks";

const INFO = gql`
  query {
    users {
      nom
      prenom
      numero
    }
}
`;

const Postuler = () => {
  const { data, loading, error } = useQuery(INFO);
  return (
    loading ? (<Text> Loading ...</Text>) : (
      <View style={styles.container}>
        <Text>Maison</Text>
        {/* {data.users.map(user => (
          <Text key={user.numero}>{user.nom} {user.prenom} {user.numero}</Text>
        ))} */}
      </View >
    )
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Postuler
