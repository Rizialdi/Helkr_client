import React from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStoreState } from '../../models';
import { Text, Layout, Block } from '../sharedComponents';
import { ListCard } from './components';
import { useGetAvisUserQuery } from '../../graphql';
import { makePseudoName } from '../../utils';
import { MainStackParamList } from '../../navigation/Routes';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme } from '../../constants';

interface Props {
  navigation?: StackNavigationProp<MainStackParamList, 'Avis'>;
  route?: RouteProp<MainStackParamList, 'Avis'>;
  candidateModalId?: string;
  onOfferingDetailsForCandidate?: boolean;
}

export default ({
  navigation,
  candidateModalId,
  route,
  onOfferingDetailsForCandidate
}: Props) => {
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
    fetchPolicy: 'cache-and-network'
  });

  return (
    <Layout
      title={onOfferingDetailsForCandidate ? '' : 'Avis'}
      iconName={onOfferingDetailsForCandidate ? '' : 'close'}
      callBack={navigation?.goBack}
      callBackParams={[]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <Block
            flex={false}
            center
            middle
            margin={[theme.sizes.screenHeight / 4, 0]}>
            <ActivityIndicator size="large" color="black" />
          </Block>
        ) : (
          <Block flex={false} center>
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
                    style={{ width: theme.sizes.screenWidth }}
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
              <Text bold style={{ marginTop: theme.sizes.htwiceTen * 1.25 }}>
                Ce prestataire n'a aucun avis pour le moment.
              </Text>
            )}
            {error && (
              <Text center style={{ marginTop: theme.sizes.htwiceTen * 1.25 }}>
                Une erreur s'est produite sur le réseau.
              </Text>
            )}
          </Block>
        )}
      </ScrollView>
    </Layout>
  );
};
