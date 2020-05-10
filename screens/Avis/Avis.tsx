import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  Dimensions,
  ScrollView,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { ListCard } from './components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const AVIS = gql`
  query getAvisUser($userId: String!) {
    getAvisUser(userId: $userId) {
      score
      comment
      createdAt
      scorer {
        id
        nom
        prenom
        avatar
      }
    }
  }
`;

export default ({ navigation, route: { params } }) => {
  const [Id, setId] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const id = await AsyncStorage.getItem('id');
        setId(id);
      } catch (error) {
        throw new Error('Unable to load Credentials');
      }
    })();
  }, []);

  const userId = params && params.id ? params.id : Id;

  const {
    loading,
    error,
    data: { getAvisUser = null }
  } = useQuery(AVIS, {
    variables: { userId },
    errorPolicy: 'ignore',
    fetchPolicy: 'cache-and-network',
    pollInterval: 1000 * 3600 * 24
  });

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <View
            style={{
              marginTop: width / 2
            }}
          >
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <View style={styles.container}>
            {getAvisUser ? (
              getAvisUser.map(
                (
                  {
                    score,
                    comment,
                    createdAt,
                    scorer: { id, nom, prenom, avatar }
                  },
                  key
                ) => {
                  const username =
                    prenom.replace(/^./, prenom[0].toUpperCase()) +
                    ' ' +
                    nom.charAt(0) +
                    '.';
                  return (
                    <TouchableOpacity
                      style={{ width: width }}
                      key={key}
                      onPress={() =>
                        navigation.navigate('ProfilesNavigation', {
                          id: id
                        })
                      }
                    >
                      <ListCard
                        avatar={avatar}
                        scorer={username}
                        score={score}
                        comment={comment}
                        createdAt={createdAt}
                      />
                    </TouchableOpacity>
                  );
                }
              )
            ) : (
              <Text style={{ marginTop: 25 }}>
                Vous n'avez aucun avis pour le moment.
              </Text>
            )}
            {error && (
              <Text style={{ marginTop: 25 }}>
                Une erreur sur le réseau s'est produite
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});

{
}
