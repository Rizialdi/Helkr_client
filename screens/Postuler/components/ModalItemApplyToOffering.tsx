import React, { FC, useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

import {
  Block,
  Button,
  Layout,
  Text,
  OfferingDetailsOnModal,
  StackedToBottom,
  TagItem,
  ModalItemInfos
} from '../../sharedComponents';
import { formatDate } from '../../../utils';
import {
  useCandidateToOfferingMutation,
  useOfferingByIdQuery
} from '../../../graphql';
import CompletePieces from './CompletePieces';
import { useStoreState } from '../../../models';
import { mocks, theme } from '../../../constants';
import client from '../../../ApolloClient';

interface Props {
  id?: string;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

export type ListOfPieces =
  | {
      id: number;
      label: string;
      titre: string;
      description: string;
    }[]
  | undefined;

const ModalItem: FC<Props> = props => {
  const { data, loading, error } = useOfferingByIdQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: props?.id || ''
    }
  });
  const [ModalOpen, setModalOpen] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [modalOverlaySize, setModalOverlaySize] = useState<number>(0.5);
  const [applyTo] = useCandidateToOfferingMutation();
  const [listOfPieces, setListOfPieces] = useState<ListOfPieces>();
  const { jobAuthorizations } = useStoreState(store => store.JobAuthorization);
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);
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
            // TODO Update Function
            if (errors || error) {
              setErrorModal(true);
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
            {loading || !data ? (
              <Block padding={[theme.sizes.screenHeight / 4, 0]}>
                <ActivityIndicator size={'large'} />
              </Block>
            ) : (
              <Block
                flex={false}
                margin={[
                  0,
                  theme.sizes.hinouting,
                  theme.sizes.inouting * 2.75
                ]}>
                <Block
                  margin={[0, -theme.sizes.inouting]}
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
                <Text
                  bold
                  size={theme.sizes.base}
                  vertical={[theme.sizes.htwiceTen, theme.sizes.htwiceTen / 2]}>
                  Description
                </Text>
                <Text>{data?.offeringById?.description}</Text>

                <Text
                  bold
                  size={theme.sizes.base}
                  vertical={[theme.sizes.htwiceTen, theme.sizes.htwiceTen / 2]}>
                  Categorie
                </Text>
                <OfferingDetailsOnModal details={data?.offeringById?.details} />
              </Block>
            )}
            {errorModal && (
              <ModalItemInfos
                errorReporting
                information={'Erreur'}
                description={
                  "Une erreur s'est produite pendant votre candidature. Veuillez réessayer plus tard."
                }
                timer={1}
                callBack={props.setOpenModal}
                callBackParams={[false]}
              />
            )}
          </>
        </Layout>
      </ScrollView>
      <Block
        margin={[-theme.sizes.hinouting * 0.8, theme.sizes.inouting * 0.8]}>
        <StackedToBottom>
          <Button
            secondary
            disabled={!netWorkStatus}
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
        <View
          style={[
            styles.modal,
            {
              height: theme.sizes.screenHeight * modalOverlaySize
            }
          ]}>
          {!isAuthorizedToApply && (
            <CompletePieces
              listOfPieces={listOfPieces}
              referenceId={data?.offeringById.referenceId as string}
              setOpenModal={
                props.setOpenModal as React.Dispatch<
                  React.SetStateAction<Boolean>
                >
              }
              setModalOverlaySize={setModalOverlaySize}
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
    paddingTop: theme.sizes.hinouting * 0.8,
    justifyContent: 'flex-end',
    overflow: 'hidden'
  },
  modal: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderTopLeftRadius: theme.sizes.radius * 2,
    borderTopRightRadius: theme.sizes.radius * 2
  }
});

export default ModalItem;
