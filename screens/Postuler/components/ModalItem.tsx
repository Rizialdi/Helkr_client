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

interface Props {
  id?: string;
  status?: 'acceptée' | 'refusée' | 'en attente';
}

const ModalItem: FC<Props> = props => {
  const {
    data: dataFromQuery,
    loading,
    error,
    called
  } = useOfferingByIdPostuleesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: props?.id || ''
    }
  });

  const [data, setData] = useState<OfferingByIdPostuleesQuery | undefined>();
  useEffect(() => {
    !loading && !error && dataFromQuery && setData(dataFromQuery);
  }, []);
  const author = data?.offeringById?.author;

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Layout title={'Details'}>
          <>
            {loading || (!called && <ActivityIndicator size={'large'} />)}
            {error && <Text>Une erreur sur le reseau s'est produite</Text>}
            {data && (
              <Block flex={false} margin={[0, 25, 48 * 2 + 20]}>
                <Block
                  margin={[0, -25]}
                  flex={false}
                  row
                  middle
                  space={'around'}>
                  <TagItem tag={data?.offeringById?.type} type />
                  <TagItem tag={data?.offeringById?.category} category />
                  <TagItem
                    tag={
                      data?.offeringById.updatedAt
                        ? formatDateAvis(data?.offeringById?.updatedAt)
                        : formatDateAvis(data?.offeringById?.createdAt)
                    }
                    date
                  />
                </Block>
                <Text bold size={16} vertical={[20, 10]}>
                  Description
                </Text>
                <Text>{data?.offeringById?.description}</Text>

                <Text bold size={16} vertical={[20, 10]}>
                  Categorie
                </Text>

                <Text horizontal={20}>{data?.offeringById?.category}</Text>

                <Text bold size={16} vertical={[20, 10]}>
                  Renseignements
                </Text>

                <OfferingDetailsOnModal details={data?.offeringById?.details} />

                {props.status === 'acceptée' && (
                  <>
                    <Text bold size={16} vertical={[20, 10]}>
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
                        <Text bold size={16} vertical={[20, 10]}>
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
