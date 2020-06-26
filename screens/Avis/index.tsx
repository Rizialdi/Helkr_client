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
import { useGetAvisUserQuery } from '../../graphql';
import { makePseudoName } from '../../utils';

const { width } = Dimensions.get('window');

interface Props {
  navigation: Route;
  // TODO Give Proper type
  route: any;
}

export default ({ navigation, route: { params } }: Props) => {
  const { user } = useStoreState(state => state.User);
  const userId = params && params.id ? params.id : user?.id;

  const { loading, error, data } = useGetAvisUserQuery({
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
            }}>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <View style={styles.container}>
            {data && data?.getAvisUser ? (
              data?.getAvisUser?.map(avis => {
                const {
                  id: idAvis,
                  score,
                  comment,
                  createdAt,
                  scorer: { id, nom, prenom, avatar }
                } = avis;
                const username = makePseudoName(nom, prenom);
                return (
                  <TouchableOpacity
                    style={{ width: width }}
                    key={idAvis}
                    onPress={() =>
                      navigation.navigate('ProfilesNavigation', {
                        id: id
                      })
                    }>
                    <ListCard
                      avatar={avatar}
                      scorer={username}
                      score={score}
                      comment={comment}
                      createdAt={createdAt}
                    />
                  </TouchableOpacity>
                );
              })
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
