import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '../shareComponents';

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
  return loading ? (
    <Text> Loading ...</Text>
  ) : (
    <View style={styles.container}>
      <Text>La liste des utilisateurs:</Text>
      {data &&
        data.users.map((user) => (
          <Text key={user.numero}>
            {user.nom} {user.prenom} {user.numero}
          </Text>
        ))}
      {error && <Text>Echec de requete de données</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Postuler;
