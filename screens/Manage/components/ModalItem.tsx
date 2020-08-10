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
import { theme } from '../../../constants';

interface Props {
  id?: string;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalItem: FC<Props> = props => {
  const { called, loading, data } = useOfferingByIdQuery({
    variables: { id: props.id as string }
  });

  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);

  const client = useApolloClient();
  const [applyTo] = useCandidateToOfferingMutation();

  return (
    <Layout
      title={'Details'}
      iconName="close"
      callBack={props.setOpenModal}
      callBackParams={[false]}>
      {(loading && !called) || !data ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <Block flex={false}>
          <Block flex={false} row middle space={'around'}>
            <TagItem tag={data?.offeringById?.type} type />
            <TagItem tag={data?.offeringById?.category} category />
            {data?.offeringById?.createdAt &&
              formatDateAvis(data?.offeringById?.createdAt) && (
                <TagItem
                  tag={formatDateAvis(data?.offeringById?.createdAt)}
                  date
                />
              )}
          </Block>
          <Text
            style={{
              marginHorizontal: theme.sizes.base,
              marginVertical: theme.sizes.hbase
            }}>
            {data?.offeringById?.description}
          </Text>
          <Text
            style={{
              marginHorizontal: theme.sizes.base,
              marginVertical: theme.sizes.hbase
            }}>
            {JSON.stringify(data?.offeringById?.details)}
          </Text>
          <Block
            margin={[theme.sizes.hinouting * 0.8, theme.sizes.inouting * 0.8]}>
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
