import React, { useState, SFC } from 'react';
import { graphql, useMutation } from 'react-apollo';
import { ActivityIndicator } from 'react-native';
import gql from 'graphql-tag';

import { Text, Layout, Block, Button } from '../../shareComponents';
import TagItem from './TagItem';

interface Props {
  id: string;
  offeringById: any;
}

const formatDate = (timestamp: string = '15886987435') => {
  const date = new Date(parseInt(timestamp));
  return date.getMonth() + ' ' + date.getFullYear();
};

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

const ModalItem: SFC<Props> = ({
  offeringById: { called, loading, offeringById }
}) => {
  const [applyTo, { data }] = useMutation(APPLY_TO_OFFERING);

  return (
    <Layout title={'Details'}>
      {loading && !called ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <Block flex={false}>
          {console.log(data?.candidateToOffering?.success)}
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
              onPress={() => applyTo({ variables: { id: offeringById?.id } })}
            >
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

export default graphql(GET_OFFERING, {
  name: 'offeringById',
  options: (props: { id }) => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: props?.id || ''
    }
  })
})(ModalItem);
