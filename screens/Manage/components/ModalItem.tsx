import React, { useRef, FC } from 'react';
import { useApolloClient } from 'react-apollo';
import { ActivityIndicator } from 'react-native';

import { Text, Layout, Block, Button, TagItem } from '../../shareComponents';
import {
  useOfferingByIdQuery,
  useCandidateToOfferingMutation
} from '../../../graphql';
import { formatDateAvis } from '../../../utils';
interface Props {
  id?: string;
}

const ModalItem: FC<Props> = props => {
  const { called, loading, data } = useOfferingByIdQuery({
    variables: { id: props.id as string }
  });

  const client = useApolloClient();
  const [applyTo] = useCandidateToOfferingMutation();
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
            <TagItem tag={formatDateAvis(data?.offeringById?.createdAt)} date />
          </Block>
          <Text style={{ marginHorizontal: 30, marginVertical: 15 }}>
            {data?.offeringById?.description}
          </Text>
          <Text style={{ marginHorizontal: 30, marginVertical: 15 }}>
            {data?.offeringById?.details}
          </Text>
          <Block margin={[20, 20]}>
            <Button
              secondary
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
