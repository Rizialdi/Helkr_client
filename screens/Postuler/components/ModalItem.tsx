import React, { useRef, SFC, ComponentType } from 'react';
import {
  graphql,
  useMutation,
  useApolloClient,
  ChildProps,
  ChildDataProps,
  DataProps
} from 'react-apollo';
import { ActivityIndicator } from 'react-native';
import gql from 'graphql-tag';

import { Text, Layout, Block, Button } from '../../shareComponents';
import { TagItem } from '../../shareComponents';

import { formatDate } from '../../../utils';

interface Props {
  id?: string;
  modalOpening: () => void;
  offeringById: any;
}

const GET_OFFERING = gql`
  query offeringById($id: String!) {
    offeringById(id: $id) {
      id
      type
      category
      description
      details
      createdAt
    }
  }
`;

const APPLY_TO_OFFERING = gql`
  mutation candidateToOffering($id: String!) {
    candidateToOffering(id: $id) {
      success
    }
  }
`;

const ModalItem: SFC<ChildProps<Props, {}, any>> = ({
  offeringById: { called, loading, offeringById }
}) => {
  const [applyTo] = useMutation(APPLY_TO_OFFERING);
  const client = useApolloClient();

  const toastRef = useRef(null);
  const applySuccess = () => {
    client.reFetchObservableQueries();
  };
  return (
    <Layout title={'Details'}>
      {loading && !called ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <Block flex={false}>
          <Block flex={false} row middle space={'around'}>
            <TagItem tag={offeringById?.type} type />
            <TagItem tag={offeringById?.category} category />
            <TagItem tag={formatDate(offeringById?.createdAt)} date />
          </Block>
          <Text style={{ marginHorizontal: 30, marginVertical: 15 }}>
            {offeringById?.description}
          </Text>
          <Text style={{ marginHorizontal: 30, marginVertical: 15 }}>
            {offeringById?.details}
          </Text>
          <Block margin={[20, 20]}>
            <Button
              secondary
              onPress={() =>
                applyTo({ variables: { id: offeringById?.id } })
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

interface Props {
  id?: string;
}

type TChildProps = ChildDataProps<{}, Props, {}>;

export default graphql<{}, Props, {}, TChildProps>(GET_OFFERING, {
  name: 'offeringById',
  options: (props: { id?: string }) => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: props?.id || ''
    }
  })
})((ModalItem as unknown) as ComponentType<DataProps<Props, {}>>);
