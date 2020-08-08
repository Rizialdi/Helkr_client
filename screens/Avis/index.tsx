import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStoreState } from '../../models';
import { Text, Layout } from '../sharedComponents';
import { ListCard } from './components';
import { useGetAvisUserQuery } from '../../graphql';
import { makePseudoName } from '../../utils';
import { MainStackParamList } from '../../navigation/Routes';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const { width } = Dimensions.get('window');

interface Props {
  navigation?: StackNavigationProp<MainStackParamList, 'Avis'>;
  route?: RouteProp<MainStackParamList, 'Avis'>;
  candidateModalId?: string;
}

export default ({ navigation, candidateModalId, route }: Props) => {
  const Navigation = navigation ? navigation : '';
  const { user } = useStoreState(state => state.User);
  const { themeColors } = useStoreState(state => state.Preferences);
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);
  const routeParams = route && route.params ? route.params : '';
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
    <Layout
      title={'Avis'}
      iconName={'close'}
      callBack={navigation?.goBack}
      callBackParams={[]}>
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
                    disabled={!netWorkStatus}
                    onPress={() =>
                      candidateModalId
                        ? null
                        : Navigation
                        ? Navigation.navigate('Profile', {
                            id: id
                          })
                        : null
                    }>
                    <ListCard
                      avatar={avatar || ''}
                      scorer={username}
                      score={score}
                      comment={comment}
                      createdAt={createdAt}
                      color={themeColors.primary}
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
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});
