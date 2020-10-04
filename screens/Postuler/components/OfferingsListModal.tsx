import React, { SFC, useState, useEffect } from 'react';
import { RouteProp } from '@react-navigation/native';
import { DetailOfferingParamsList } from '../../../navigation/Routes';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  useOfferingByIdQuery,
  useCandidateToOfferingMutation
} from '../../../graphql';
import { ListOfPieces } from './ModalItemApplyToOffering';
import { useStoreState } from 'easy-peasy';
import { mocks, theme } from '../../../constants';
import client from '../../../ApolloClient';
import {
  Block,
  Text,
  TagItem,
  OfferingDetailsOnModal,
  ModalItemInfos,
  StackedToBottom,
  Button
} from '../../sharedComponents';
import { formatDate } from '../../../utils';
import CompletePieces from './CompletePieces';
import { ActivityIndicator, View, ScrollView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
interface Props {
  route?: RouteProp<DetailOfferingParamsList, 'OfferingsListModal'>;
  navigation?: StackNavigationProp<
    DetailOfferingParamsList,
    'OfferingsListModal'
  >;
}
const OfferingsListModal: SFC<Props> = ({ navigation, route }) => {
  const { data, loading, error } = useOfferingByIdQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: route?.params.id || ''
    }
  });
  const [ModalOpen, setModalOpen] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [modalOverlaySize, setModalOverlaySize] = useState<number>(0.5);
  const [applyTo] = useCandidateToOfferingMutation();
  const [listOfPieces, setListOfPieces] = useState<ListOfPieces>();
  const { jobAuthorizations } = useStoreState(store => store.JobAuthorization);
  const [isAuthorizedToApply, setIsAuthorized] = useState<boolean>(false);
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);

  console.log('jobAuthorizations', jobAuthorizations);
  useEffect(() => {
    if (
      data?.offeringById.referenceId &&
      jobAuthorizations &&
      jobAuthorizations.includes(data?.offeringById.referenceId)
    ) {
      setIsAuthorized(true);
    } else {
      const list = mocks.getListofPieces(data?.offeringById.referenceId);
      setListOfPieces(list);
    }
  }, [data, jobAuthorizations]);

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
      .then(() => navigation?.goBack());
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
              margin={[0, theme.sizes.hinouting, theme.sizes.inouting * 2.75]}>
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
                Catégorie
              </Text>
              <Text>{data?.offeringById?.category}</Text>

              <Text
                bold
                size={16}
                vertical={[theme.sizes.htwiceTen, theme.sizes.htwiceTen / 2]}>
                Renseignements
              </Text>

              <OfferingDetailsOnModal details={data?.offeringById?.details} />

              <Text
                bold
                size={theme.sizes.base}
                vertical={[theme.sizes.htwiceTen, theme.sizes.htwiceTen / 2]}>
                Description
              </Text>
              <Text>{data?.offeringById?.description}</Text>
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
              callBack={navigation?.goBack}
            />
          )}
        </>
      </ScrollView>
      <Block
        margin={[-theme.sizes.hinouting * 0.1, theme.sizes.inouting * 0.8]}>
        <StackedToBottom>
          <Button
            secondary
            disabled={!netWorkStatus}
            onPress={
              () => null
              // isAuthorizedToApply ? applyToOffering() : setModalOpen(true)
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
              setOpenModal={navigation?.goBack}
              setModalOverlaySize={setModalOverlaySize}
            />
          )}
        </View>
      </Modal>
    </View>
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

export default OfferingsListModal;
