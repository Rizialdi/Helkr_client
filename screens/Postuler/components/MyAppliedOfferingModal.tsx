import React, { SFC, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { theme } from '../../../constants';
import {
  OfferingByIdPostuleesQuery,
  useOfferingByIdPostuleesQuery
} from '../../../graphql';
import { DetailOfferingParamsList } from '../../../navigation/Routes';
import { formatDateAvis } from '../../../utils';
import {
  Block,
  Card,
  OfferingDetailsOnModal,
  OfferingLoadingIndicator,
  TagItem,
  Text
} from '../../sharedComponents';
import EventDay from '../../sharedComponents/EventDay';
import AuthorCard from './AuthorCard';
import PreferredDays from './PreferredDays';

interface Props {
  route?: RouteProp<DetailOfferingParamsList, 'MyAppliedOfferingModal'>;
  navigation?: StackNavigationProp<
    DetailOfferingParamsList,
    'MyAppliedOfferingModal'
  >;
}
const MyAppliedOfferingMod: SFC<Props> = ({ route }) => {
  const { data: dataFromQuery, loading, error } = useOfferingByIdPostuleesQuery(
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        id: route?.params.id || ''
      }
    }
  );

  const [data, setData] = useState<OfferingByIdPostuleesQuery | undefined>();
  useEffect(() => {
    !loading && !error && dataFromQuery && setData(dataFromQuery);
  }, [dataFromQuery, error, loading]);
  const author = data?.offeringById?.author;

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#FFF' }}>
        <>
          {error && (
            <Text center style={{ marginTop: theme.sizes.htwiceTen * 1.25 }}>
              Une erreur s'est produite sur le réseau.
            </Text>
          )}
          {loading && !data && (
            <Block padding={[theme.sizes.base, theme.sizes.base * 1.5]}>
              <OfferingLoadingIndicator />
            </Block>
          )}
          {data && (
            <Block
              flex={false}
              margin={[0, theme.sizes.inouting, theme.sizes.hinouting * 4.64]}>
              <Block
                margin={[0, -theme.sizes.inouting]}
                flex={false}
                row
                middle
                space={'around'}>
                <TagItem tag={data?.offeringById?.type} type />
                <TagItem tag={data?.offeringById?.category} category />
                {data?.offeringById?.updatedAt &&
                  formatDateAvis(data?.offeringById?.updatedAt) && (
                    <TagItem
                      tag={
                        data?.offeringById.updatedAt
                          ? formatDateAvis(data?.offeringById?.updatedAt)
                          : formatDateAvis(data?.offeringById?.createdAt)
                      }
                      date
                    />
                  )}
              </Block>

              <Text
                bold
                size={theme.sizes.base}
                vertical={[
                  theme.sizes.hinouting * 0.8,
                  theme.sizes.hinouting * 0.4
                ]}>
                Catégorie
              </Text>

              <Text horizontal={20}>{data?.offeringById?.category}</Text>

              <Text
                bold
                size={theme.sizes.base}
                vertical={[
                  theme.sizes.hinouting * 0.8,
                  theme.sizes.hinouting * 0.4
                ]}>
                Renseignements
              </Text>
              <OfferingDetailsOnModal details={data?.offeringById?.details} />

              <Text
                bold
                size={theme.sizes.base}
                vertical={[
                  theme.sizes.hinouting * 0.8,
                  theme.sizes.hinouting * 0.4
                ]}>
                Description
              </Text>
              <Text horizontal={20}>{data?.offeringById?.description}</Text>

              {route?.params.status !== 'acceptée' && (
                <Text vertical={[20, 10]}>
                  Vous recevrez plus d'informations si vous êtes accepté(e) pour
                  cette mission.{' '}
                </Text>
              )}

              {route?.params.status === 'acceptée' && (
                <>
                  <Text
                    bold
                    size={theme.sizes.base}
                    vertical={[
                      theme.sizes.hinouting * 0.8,
                      theme.sizes.hinouting * 0.4
                    ]}>
                    Auteur
                  </Text>
                  <Card shadow>
                    <AuthorCard
                      id={author?.id as string}
                      nom={author?.nom as string}
                      prenom={author?.prenom as string}
                      numero={author?.numero as string}
                      avatar={author?.avatar as string}
                      address={author?.address as string}
                    />
                  </Card>
                  {data?.offeringById.eventday ? (
                    <EventDay eventday={data?.offeringById.eventday} />
                  ) : (
                    <>
                      <Text
                        bold
                        size={theme.sizes.base}
                        vertical={[
                          theme.sizes.hinouting * 0.8,
                          theme.sizes.hinouting * 0.4
                        ]}>
                        Jours choisis
                      </Text>
                      <PreferredDays
                        offeringId={route?.params.id as string}
                        preferredDays={
                          data?.offeringById.preferreddays as string[]
                        }
                      />
                    </>
                  )}
                </>
              )}
            </Block>
          )}
        </>
      </ScrollView>
    </>
  );
};

export default MyAppliedOfferingMod;
