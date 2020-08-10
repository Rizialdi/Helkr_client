import React, { useState, FC, useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import Modal from 'react-native-modal';

import {
  Calendar,
  ModalItemInfos,
  Text,
  Layout,
  Block,
  TagItem,
  CandidateCard,
  SelectedCandidateCard,
  OfferingDetailsOnModal,
  EventDay
} from '../../sharedComponents';
import {
  useOfferingByIdQuery,
  useChooseCandidateMutation,
  MyIncompleteOfferingWithCandidatesQuery,
  MyIncompleteOfferingWithCandidatesDocument,
  OfferingByIdQuery,
  OfferingByIdDocument
} from '../../../graphql';
import { formatDateAvis } from '../../../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Avis from '../../Avis';
import { LocalDateObject } from '../../sharedComponents/Calendar';
import Button from '../../sharedComponents/Button';
import MultiStepMenuCheckout from './MultiStepMenuCheckout';
import CompletedOrIssue from './CompletedOrIssue';
import AmountToPay from './AmountToPay';
import ValidationCode from './ValidationCode';
import DropReview from './DropReview';
import IssueReporting from './IssueReporting';
import { DataProxy } from 'apollo-cache';
import { useStoreState } from '../../../models';
import { theme } from '../../../constants';

interface Props {
  id?: string;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

export type CandidateCardClickedPart = '' | 'icon';
export type CompletedOrIssue = 'completed' | 'issue' | null;

const ModalItemManageCandidates: FC<Props> = props => {
  const [selectedId, setSelectedId] = useState<string>('');
  const [Data, setData] = useState<OfferingByIdQuery | undefined>();
  const { called, loading, data, error } = useOfferingByIdQuery({
    variables: { id: props.id as string },
    fetchPolicy: 'cache-and-network'
  });

  useEffect(() => {
    if (data && !loading && !error) {
      setData(data);
    }
  }, [data]);

  const [chooseCandidate] = useChooseCandidateMutation();
  const [isUpdateOnUser, setIsUpdateOnUser] = useState<boolean>(false);
  const [date, setDate] = useState<LocalDateObject | null>(null);
  const [candidateCardClickedPart, setCandidateCardClickedPart] = useState<
    CandidateCardClickedPart
  >('');
  const [completedOrIssue, setCompletedOrIssue] = useState<CompletedOrIssue>(
    null
  );

  const [priceToPay, setPriceToPay] = useState<string>('0');
  const [isValidationCodeCorrect, setIsValidationCodeCorrect] = useState<
    boolean
  >(false);

  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);

  const onModalClose = () => {
    setDate({});
    setSelectedId('');
    setCandidateCardClickedPart('');
  };
  const updateCache = (cache: DataProxy) => {
    if (!selectedId || !props.id) return;

    const myIncompleteOfferingWithCandidates = cache.readQuery({
      query: MyIncompleteOfferingWithCandidatesDocument
    }) as MyIncompleteOfferingWithCandidatesQuery | undefined;

    const offeringById = cache.readQuery({
      query: OfferingByIdDocument,
      variables: { id: props.id }
    }) as OfferingByIdQuery | undefined;

    const selectedCandidate = Data?.offeringById.candidates.find(
      item => item.id === selectedId
    );

    const newMyIncompeleteOfferingWithCandidates = myIncompleteOfferingWithCandidates?.myIncompleteOfferingWithCandidates.map(
      item => {
        if (item.id != props.id) return item;
        return {
          ...item,
          status: 'validée',
          selectedCandidate
        };
      }
    );

    const newMyIncompleteOfferingsWithCandidates = {
      myIncompleteOfferingWithCandidates: newMyIncompeleteOfferingWithCandidates
    };

    const newOfferingById = {
      ...offeringById,
      offeringById: {
        ...offeringById?.offeringById,
        selectedCandidate
      }
    };

    cache.writeQuery({
      query: MyIncompleteOfferingWithCandidatesDocument,
      data: newMyIncompleteOfferingsWithCandidates
    });

    cache.writeQuery({
      query: OfferingByIdDocument,
      variables: { id: props.id },
      data: newOfferingById
    });
  };

  const onSubmit = () => {
    if (!date) return;
    const arrayOfDate = Object.keys(date).map(item =>
      new Date(item).getTime().toString()
    );
    chooseCandidate({
      variables: {
        id: props.id as string,
        candidateId: selectedId,
        preferreddays: arrayOfDate
      },
      update: updateCache
    }).then(({ data }) => {
      try {
        if (data?.chooseCandidate) {
          onModalClose();
        } else {
          //Modal ou information -> choix candidat impossible
        }
      } catch (error) {
        throw new Error(`Impossible de choisir le Candidate ${error}`);
      }
    });
  };

  return (
    <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
      <Layout
        title={'Details'}
        iconName="close"
        callBack={props.setOpenModal}
        callBackParams={[false]}>
        <>
          {(loading && !called) || !data ? (
            <ActivityIndicator size={'large'} />
          ) : (
            <Block flex={false} margin={[0, theme.sizes.inouting]}>
              <Block
                margin={[0, -theme.sizes.inouting]}
                flex={false}
                row
                middle
                space={'around'}>
                <TagItem tag={Data?.offeringById?.type} type />
                <TagItem tag={Data?.offeringById?.category} category />
                {Data?.offeringById?.createdAt &&
                  formatDateAvis(Data?.offeringById?.createdAt) && (
                    <TagItem
                      tag={formatDateAvis(Data?.offeringById?.createdAt)}
                      date
                    />
                  )}
              </Block>
              <Text
                bold
                size={16}
                vertical={[theme.sizes.htwiceTen, theme.sizes.htwiceTen / 2]}>
                Description
              </Text>

              <Text>{Data?.offeringById?.description}</Text>

              <Text
                bold
                size={16}
                vertical={[theme.sizes.htwiceTen, theme.sizes.htwiceTen / 2]}>
                Categorie
              </Text>

              <Text>{Data?.offeringById?.category}</Text>

              <Text
                bold
                size={16}
                vertical={[theme.sizes.htwiceTen, theme.sizes.htwiceTen / 2]}>
                Renseignements
              </Text>

              <OfferingDetailsOnModal details={Data?.offeringById?.details} />
              <Block flex={false}>
                <Text
                  bold
                  size={16}
                  vertical={[theme.sizes.htwiceTen, theme.sizes.htwiceTen / 2]}>
                  {Data?.offeringById.selectedCandidate
                    ? 'Candidat retenu'
                    : 'Candidats'}
                </Text>
                {Data?.offeringById.selectedCandidate ? (
                  <TouchableOpacity
                    key={Data?.offeringById.selectedCandidate.id}
                    onPress={() =>
                      Data?.offeringById.selectedCandidate &&
                      setIsUpdateOnUser(true)
                    }>
                    <SelectedCandidateCard
                      id={Data?.offeringById.selectedCandidate.id}
                      avatar={
                        Data?.offeringById.selectedCandidate.avatar as string
                      }
                      average={Data?.offeringById.selectedCandidate.moyenne}
                      professional={
                        Data?.offeringById.selectedCandidate.professional
                      }
                    />
                  </TouchableOpacity>
                ) : Data?.offeringById.candidates.length ? (
                  data.offeringById.candidates.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => setSelectedId(item.id)}>
                      <CandidateCard
                        id={item.id}
                        avatar={item.avatar as string}
                        average={item.moyenne}
                        professional={item.professional}
                        parentCallback={setCandidateCardClickedPart}
                        setSelectedId={setSelectedId}
                      />
                    </TouchableOpacity>
                  ))
                ) : (
                  <></>
                )}
                {Data?.offeringById.eventday && (
                  <EventDay eventday={Data?.offeringById.eventday} />
                )}
              </Block>

              <Modal
                isVisible={isUpdateOnUser}
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                useNativeDriver
                style={styles.modalContainer}
                backdropColor={'#C1BEC0'}
                onBackButtonPress={() => setIsUpdateOnUser(false)}
                onBackdropPress={() => setIsUpdateOnUser(false)}
                onSwipeComplete={() => setIsUpdateOnUser(false)}>
                <View
                  style={[
                    styles.modal,
                    { height: theme.sizes.screenHeight * 0.5 }
                  ]}>
                  <Text center bold>
                    Dites nous tout
                  </Text>
                  <MultiStepMenuCheckout>
                    <MultiStepMenuCheckout.MenuItemCheckout>
                      <CompletedOrIssue
                        setCompletedOrIssue={setCompletedOrIssue}
                      />
                    </MultiStepMenuCheckout.MenuItemCheckout>
                    <MultiStepMenuCheckout.MenuItemCheckout>
                      {completedOrIssue === 'completed' ? (
                        <AmountToPay setPriceToPay={setPriceToPay} />
                      ) : completedOrIssue === 'issue' ? (
                        <KeyboardAvoidingView behavior={'padding'}>
                          <ScrollView
                            alwaysBounceVertical={true}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={true}>
                            <IssueReporting />
                          </ScrollView>
                        </KeyboardAvoidingView>
                      ) : (
                        <Text>Vous ne devriez pas etre ici</Text>
                      )}
                    </MultiStepMenuCheckout.MenuItemCheckout>
                    <MultiStepMenuCheckout.MenuItemCheckout>
                      {completedOrIssue === 'completed' && priceToPay ? (
                        <ValidationCode
                          setIsValidationCodeCorrect={
                            setIsValidationCodeCorrect
                          }
                        />
                      ) : (
                        <Text>Une erreur s'est produite</Text>
                      )}
                    </MultiStepMenuCheckout.MenuItemCheckout>
                    <MultiStepMenuCheckout.MenuItemCheckout>
                      {completedOrIssue === 'completed' &&
                      priceToPay &&
                      isValidationCodeCorrect ? (
                        <KeyboardAvoidingView behavior={'padding'}>
                          <ScrollView
                            alwaysBounceVertical={true}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={true}>
                            <DropReview />
                          </ScrollView>
                        </KeyboardAvoidingView>
                      ) : (
                        <Text>Une erreur s'est produite</Text>
                      )}
                    </MultiStepMenuCheckout.MenuItemCheckout>
                    <MultiStepMenuCheckout.MenuItemCheckout>
                      {completedOrIssue === 'completed' &&
                      priceToPay &&
                      isValidationCodeCorrect ? (
                        <></>
                      ) : (
                        <Text>Une erreur s'est produite</Text>
                      )}
                    </MultiStepMenuCheckout.MenuItemCheckout>
                  </MultiStepMenuCheckout>
                </View>
              </Modal>

              <Modal
                isVisible={!!selectedId || candidateCardClickedPart === 'icon'}
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                useNativeDriver
                style={styles.modalContainer}
                backdropColor={'#C1BEC0'}
                onBackButtonPress={() => onModalClose()}
                onBackdropPress={() => onModalClose()}
                onSwipeComplete={() => onModalClose()}>
                <View style={styles.modal}>
                  {candidateCardClickedPart === 'icon' ? (
                    <>
                      <Text center bold vertical={theme.sizes.htwiceTen * 1.25}>
                        Veuillez choisir 3 jours qui vous conviennent
                      </Text>
                      <Calendar parentCallback={setDate} />
                      {date && Object.keys(date).length === 3 && (
                        <Block
                          margin={[
                            theme.sizes.hinouting * 0.8,
                            theme.sizes.inouting * 0.8
                          ]}>
                          <Button
                            secondary
                            disabled={!netWorkStatus}
                            onPress={() => onSubmit()}>
                            <Text bold center>
                              Je chosis ce candidat
                            </Text>
                          </Button>
                        </Block>
                      )}
                    </>
                  ) : (
                    netWorkStatus && <Avis candidateModalId={selectedId} />
                  )}
                </View>
              </Modal>
            </Block>
          )}
          {error && (
            <ModalItemInfos
              errorReporting
              information={'Erreur'}
              description={
                'Une erreur est survenue sur le réseau. Veuillez réessayer plus tard'
              }
              timer={0.5}
            />
          )}
        </>
      </Layout>
    </ScrollView>
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
    height: theme.sizes.screenHeight * 0.75,
    backgroundColor: 'white',
    borderTopLeftRadius: theme.sizes.base * 0.75,
    borderTopRightRadius: theme.sizes.base * 0.75
  }
});
export default ModalItemManageCandidates;
