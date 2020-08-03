import React, { FC, useState, useEffect } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import Modal from 'react-native-modal';

import {
  Block,
  Button,
  Layout,
  Text,
  OfferingDetailsOnModal,
  StackedToBottom
} from '../../sharedComponents';
import { TagItem } from '../../sharedComponents';
import { formatDate } from '../../../utils';
import {
  useCandidateToOfferingMutation,
  useOfferingByIdQuery
} from '../../../graphql';
import CompletePieces from './CompletePieces';
import { useStoreState } from '../../../models';
import { mocks } from '../../../constants';
import client from '../../../ApolloClient';

interface Props {
  id?: string;
  setOpenModal?: React.Dispatch<React.SetStateAction<Boolean>>;
}

const { height } = Dimensions.get('screen');

export type ListOfPieces =
  | {
      id: number;
      label: string;
      titre: string;
      description: string;
    }[]
  | undefined;

const ModalItem: FC<Props> = props => {
  const { data, loading, error, called } = useOfferingByIdQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: props?.id || ''
    }
  });
  const [ModalOpen, setModalOpen] = useState<boolean>(false);
  const [applyTo] = useCandidateToOfferingMutation();
  const [listOfPieces, setListOfPieces] = useState<ListOfPieces>();
  const { jobAuthorizations } = useStoreState(store => store.JobAuthorization);

  const isAuthorizedToApply =
    data?.offeringById.referenceId &&
    jobAuthorizations.includes(data?.offeringById.referenceId);

  const applyToOffering = () => {
    applyTo({
      variables: { id: data?.offeringById?.id as string }
    })
      .then(({ data, errors }) => {
        try {
          if (data?.candidateToOffering && data.candidateToOffering.success) {
            client.reFetchObservableQueries();
            // TODO success modal ?
            if (errors) {
              // TODO error modal
            }
          }
        } catch (error) {
          throw new Error(`Impossible de Candidater ${error}`);
        }
      })
      .then(() => props.setOpenModal && props.setOpenModal(false));
  };

  useEffect(() => {
    if (!isAuthorizedToApply) {
      const listOfPieces = mocks.getListofPieces(
        data?.offeringById.referenceId
      );
      setListOfPieces(listOfPieces);
    }
  }, []);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Layout title={'Details'}>
          <>
            {(loading && !called) || !data ? (
              <ActivityIndicator size={'large'} />
            ) : (
              <Block flex={false} margin={[0, 25, 48 * 1 + 20]}>
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
                        ? formatDate(data?.offeringById?.updatedAt)
                        : formatDate(data?.offeringById?.createdAt)
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
                <OfferingDetailsOnModal details={data?.offeringById?.details} />
              </Block>
            )}
            {error && (
              <Text accent bold>
                Une erreur reseau s'est produite. Veuillez réessayer plus tard
              </Text>
            )}
          </>
        </Layout>
      </ScrollView>
      <Block margin={[-20, 20]}>
        <StackedToBottom>
          <Button
            secondary
            onPress={() =>
              isAuthorizedToApply ? applyToOffering() : setModalOpen(true)
            }>
            <Text bold center>
              Postuler
            </Text>
          </Button>
        </StackedToBottom>
      </Block>
      <Modal
        isVisible={ModalOpen}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        useNativeDriver
        style={styles.modalContainer}
        backdropColor={'#C1BEC0'}
        onBackButtonPress={() => setModalOpen(false)}
        onBackdropPress={() => setModalOpen(false)}
        onSwipeComplete={() => setModalOpen(false)}>
        <View style={styles.modal}>
          {!isAuthorizedToApply && (
            <CompletePieces
              listOfPieces={listOfPieces}
              referenceId={data?.offeringById.referenceId as string}
              setOpenModal={
                props.setOpenModal as React.Dispatch<
                  React.SetStateAction<Boolean>
                >
              }
            />
          )}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    paddingTop: 20,
    justifyContent: 'flex-end',
    overflow: 'hidden'
  },
  modal: {
    flexDirection: 'column',
    height: height * 0.75,
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  }
});

export default ModalItem;
