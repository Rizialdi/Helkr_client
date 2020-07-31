import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useStoreState } from '../../models';
import { Text } from '../sharedComponents';
import { ListCard } from './components';
import { useGetAvisUserQuery } from '../../graphql';
import { makePseudoName } from '../../utils';
import {
  StackNavigationInterface,
  MainStackParamList
} from '../../navigation/Routes';

const { width } = Dimensions.get('window');

interface Props {
  navigation: StackNavigationInterface<MainStackParamList, 'Avis'>;
  // TODO Give Proper type
  route?: StackNavigationInterface<MainStackParamList, 'Avis'>;
  candidateModalId?: string;
}

export default ({
  navigation: { navigation },
  candidateModalId,
  route
}: Props) => {
  const { user } = useStoreState(state => state.User);
  const routeParams = route?.route.params;
  const userId = candidateModalId
    ? candidateModalId
    : routeParams && routeParams.id
    ? routeParams.id
    : user?.id
    ? user?.id
    : '';

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
            {data && data?.getAvisUser.length ? (
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
                      candidateModalId
                        ? null
                        : navigation.navigate('Profile', {
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
              <Text bold style={{ marginTop: 25 }}>
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
