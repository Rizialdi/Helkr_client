import React, { SFC } from 'react';
import { ScrollView, View } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { theme } from '../../../constants';
import { usePropositionToOfferingDetailsQuery } from '../../../graphql';
import { DetailOfferingParamsList } from '../../../navigation/Routes';
import {
  Block,
  ImageComponent,
  OfferingLoadingIndicator,
  StatsContainer,
  Text
} from '../../sharedComponents';

interface Props {
  route?: RouteProp<DetailOfferingParamsList, 'DetailsOnOfferingProposition'>;
  navigation?: StackNavigationProp<
    DetailOfferingParamsList,
    'DetailsOnOfferingProposition'
  >;
}

const DetailsOnOfferingProposition: SFC<Props> = ({ route, navigation }) => {
  const { data, loading, error } = usePropositionToOfferingDetailsQuery({
    variables: {
      offeringId: route?.params.offeringId as string,
      userId: route?.params.userId as string
    }
  });
  return (
    <ScrollView
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: 'white' }}>
      {error && (
        <Text center style={{ marginTop: theme.sizes.htwiceTen * 1.25 }}>
          Une erreur s'est produite sur le réseau.
        </Text>
      )}
      {loading || !data ? (
        <Block padding={[theme.sizes.base, theme.sizes.base * 1.5]}>
          <OfferingLoadingIndicator />
        </Block>
      ) : (
        <Block flex={false} margin={[0, theme.sizes.inouting]}>
          <Text
            bold
            size={16}
            vertical={[theme.sizes.htwiceTen, theme.sizes.htwiceTen / 2]}>
            Prestataire
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <View style={{ flex: 0.4 }}>
              <ImageComponent
                image={route?.params.avatar}
                style={{ width: '90%', height: '90%', resizeMode: 'contain' }}
              />
            </View>
            <View>
              <Text bold size={16} vertical={[theme.sizes.htwiceTen, 0]}>
                {data.propositionToOfferingDetails.candidateUsername}
              </Text>
              <Text
                size={16}
                vertical={[
                  theme.sizes.htwiceTen / 2,
                  theme.sizes.htwiceTen / 2
                ]}>
                {route?.params.professional ? 'Professionel' : 'Amateur'}
              </Text>
            </View>
          </View>
          <Text
            bold
            size={16}
            vertical={[theme.sizes.htwiceTen, theme.sizes.htwiceTen / 2]}>
            Carte individuelle
          </Text>
          <StatsContainer
            id={route?.params.userId as string}
            offeringAuthorStars={false}
            navigation={navigation}
          />

          <Text
            bold
            size={16}
            vertical={[theme.sizes.htwiceTen, theme.sizes.htwiceTen / 2]}>
            Description
          </Text>
          <Text>
            {data.propositionToOfferingDetails.descriptionPrestataire ||
              'Ce prestataire ne possède aucune présentation.'}
          </Text>

          <Text
            bold
            size={16}
            vertical={[theme.sizes.htwiceTen, theme.sizes.htwiceTen / 2]}>
            Message
          </Text>
          <Text>{data?.propositionToOfferingDetails.message}</Text>

          <Text
            bold
            size={16}
            vertical={[theme.sizes.htwiceTen, theme.sizes.htwiceTen / 2]}>
            Gamme de prix
          </Text>
          <Text>{data?.propositionToOfferingDetails.priceRange}</Text>
        </Block>
      )}
    </ScrollView>
  );
};

export default DetailsOnOfferingProposition;
