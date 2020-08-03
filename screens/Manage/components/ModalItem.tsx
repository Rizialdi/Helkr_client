import React, { FC } from 'react';
import { useApolloClient } from 'react-apollo';
import { ActivityIndicator } from 'react-native';

import { Text, Layout, Block, Button, TagItem } from '../../sharedComponents';
import {
  useOfferingByIdQuery,
  useCandidateToOfferingMutation
} from '../../../graphql';
import { formatDateAvis } from '../../../utils';
import { useStoreState } from '../../../models';

interface Props {
  id?: string;
}

const ModalItem: FC<Props> = props => {
  const { called, loading, data } = useOfferingByIdQuery({
    variables: { id: props.id as string }
  });

  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);

  const client = useApolloClient();
  const [applyTo] = useCandidateToOfferingMutation();

  return (
    <Layout title={'Details'}>
      {(loading && !called) || !data ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <Block flex={false}>
          <Block flex={false} row middle space={'around'}>
            <TagItem tag={data?.offeringById?.type} type />
            <TagItem tag={data?.offeringById?.category} category />
            <TagItem tag={formatDateAvis(data?.offeringById?.createdAt)} date />
          </Block>
          <Text style={{ marginHorizontal: 30, marginVertical: 15 }}>
            {data?.offeringById?.description}
          </Text>
          <Text style={{ marginHorizontal: 30, marginVertical: 15 }}>
            {JSON.stringify(data?.offeringById?.details)}
          </Text>
          <Block margin={[20, 20]}>
            <Button
              secondary
              disabled={!netWorkStatus}
              onPress={() =>
                applyTo({
                  variables: { id: data?.offeringById?.id as string }
                })
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
