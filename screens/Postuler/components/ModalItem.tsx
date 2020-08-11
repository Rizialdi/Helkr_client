import React, { FC, useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';

import {
  Block,
  Layout,
  Text,
  OfferingDetailsOnModal
} from '../../sharedComponents';
import { TagItem, Card } from '../../sharedComponents';
import { formatDateAvis } from '../../../utils';
import {
  useOfferingByIdPostuleesQuery,
  OfferingByIdPostuleesQuery
} from '../../../graphql';
import AuthorCard from './AuthorCard';
import PreferredDays from './PreferredDays';
import EventDay from '../../sharedComponents/EventDay';
import { theme } from '../../../constants';

interface Props {
  id?: string;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
  status?: 'acceptée' | 'refusée' | 'en attente';
}

const ModalItem: FC<Props> = props => {
  const { data: dataFromQuery, loading, error } = useOfferingByIdPostuleesQuery(
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        id: props?.id || ''
      }
    }
  );

  const [data, setData] = useState<OfferingByIdPostuleesQuery | undefined>();
  useEffect(() => {
    !loading && !error && dataFromQuery && setData(dataFromQuery);
  }, []);
  const author = data?.offeringById?.author;

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Layout
          title={'Details'}
          iconName="close"
          callBack={props.setOpenModal}
          callBackParams={[false]}>
          <>
            {error && (
              <Text center style={{ marginTop: theme.sizes.htwiceTen * 1.25 }}>
                Une erreur s'est produite sur le réseau.
              </Text>
            )}
            {(loading || !data) && (
              <Block padding={[theme.sizes.screenHeight / 4, 0]}>
                <ActivityIndicator size={'large'} />
              </Block>
            )}
            {data && (
              <Block
                flex={false}
                margin={[
                  0,
                  theme.sizes.inouting,
                  theme.sizes.hinouting * 4.64
                ]}>
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
                  Description
                </Text>
                <Text>{data?.offeringById?.description}</Text>

                <Text
                  bold
                  size={theme.sizes.base}
                  vertical={[
                    theme.sizes.hinouting * 0.8,
                    theme.sizes.hinouting * 0.4
                  ]}>
                  Categorie
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

                {props.status === 'acceptée' && (
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
                          offeringId={props.id as string}
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
        </Layout>
      </ScrollView>
    </>
  );
};

export default ModalItem;
