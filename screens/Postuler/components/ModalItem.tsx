import React, { FC, useRef } from 'react'
import { useApolloClient } from 'react-apollo'
import { ActivityIndicator } from 'react-native'

import { Block, Button, Layout, Text } from '../../shareComponents'
import { TagItem } from '../../shareComponents'
import { formatDate } from '../../../utils'
import { useCandidateToOfferingMutation, useOfferingByIdQuery } from '../../../graphql'

interface Props {
  id?: string;
}

const ModalItem: FC<Props> = props => {
  const { data, loading, error, called } = useOfferingByIdQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: props?.id || ''
    }
  });
  const [applyTo] = useCandidateToOfferingMutation();
  const client = useApolloClient();

  const toastRef = useRef(null);

  return (
    <Layout title={'Details'}>
      {loading && !called ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <Block flex={false}>
          <Block flex={false} row middle space={'around'}>
            <TagItem tag={data?.offeringById?.type} type />
            <TagItem tag={data?.offeringById?.category} category />
            <TagItem tag={formatDate(data?.offeringById?.createdAt)} date />
          </Block>
          <Text style={{ marginHorizontal: 30, marginVertical: 15 }}>
            {data?.offeringById?.description}
          </Text>
          <Text style={{ marginHorizontal: 30, marginVertical: 15 }}>
            {JSON.stringify(data?.offeringById.details)}
          </Text>
          <Block margin={[20, 20]}>
            <Button
              secondary
              onPress={() =>
                applyTo({ variables: { id: data?.offeringById?.id as string } })
                  .then(({ data }) => data?.candidateToOffering)
                  .then(data => {
                    try {
                      if (data?.success) {
                        client.reFetchObservableQueries();
                      }
                    } catch (error) {
                      throw new Error(`Impossible de Candidater ${error}`);
                    }
                  })
              }>
              <Text bold center>
                Postuler
              </Text>
            </Button>
          </Block>
        </Block>
      )}
    </Layout>
  );
};

export default ModalItem;
