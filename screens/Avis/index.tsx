import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Route
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useStoreState } from '../../models';
import { Text } from '../shareComponents';
import { ListCard } from './components';
import { RouteProp, NavigationProp } from '@react-navigation/native';

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

interface Props {
  navigation: Route;
  route: NavigationProp<>;
}

export default ({ navigation, route: { params } }: Props) => {
  const {
    user: { id: Id }
  } = useStoreState((state) => state.User);

  const userId = params && params.id ? params.id : Id;
  const { loading, error, data } = useQuery(AVIS, {
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
            {data && data.getAvisUser ? (
              data.getAvisUser.map(
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
