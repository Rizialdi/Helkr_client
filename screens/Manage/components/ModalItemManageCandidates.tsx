import React, { useState, FC } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import Modal from 'react-native-modal';
import { Calendar } from '../../sharedComponents';

import {
  Text,
  Layout,
  Block,
  TagItem,
  CandidateCard,
  SelectedCandidateCard
} from '../../sharedComponents';
import { useOfferingByIdQuery } from '../../../graphql';
import { formatDateAvis } from '../../../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Avis from '../../Avis';
import { LocalDateObject } from '../../sharedComponents/Calendar';
import Button from '../../sharedComponents/Button';
import { useChooseCandidateMutation } from '../../../graphql/helpkr-types';
import MultiStepMenuCheckout from './MultiStepMenuCheckout';
import CompletedOrIssue from './CompletedOrIssue';
import AmountToPay from './AmountToPay';
import ValidationCode from './ValidationCode';
import DropReview from './DropReview';
import IssueReporting from './IssueReporting';
import OfferingDetailsOnModal from '../../sharedComponents/OfferingDetailsOnModal';
import {
  MyIncompleteOfferingWithCandidatesQuery,
  MyIncompleteOfferingWithCandidatesDocument,
  OfferingByIdQuery,
  OfferingByIdDocument
} from '../../../graphql';
import { DataProxy } from 'apollo-cache';
import EventDay from '../../sharedComponents/EventDay';

const { height } = Dimensions.get('screen');

interface Props {
  id?: string;
}

export type CandidateCardClickedPart = '' | 'icon';
export type CompletedOrIssue = 'completed' | 'issue' | null;

const ModalItemManageCandidates: FC<Props> = props => {
  const [selectedId, setSelectedId] = useState<string>('');
  const { called, loading, data } = useOfferingByIdQuery({
    variables: { id: props.id as string }
  });

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

    const selectedCandidate = data?.offeringById.candidates.find(
      item => item.id === selectedId
    );

    const newMyIncompeleteOfferingWithCandidates = myIncompleteOfferingWithCandidates?.myIncompleteOfferingWithCandidates.map(
      item => {
        if (item.id != props.id) return item;
        return {
          ...item,
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
      <Layout title={'Details'}>
        {(loading && !called) || !data ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <Block flex={false} margin={[0, 25]}>
            <Block margin={[0, -25]} flex={false} row middle space={'around'}>
              <TagItem tag={data?.offeringById?.type} type />
              <TagItem tag={data?.offeringById?.category} category />
              <TagItem
                tag={formatDateAvis(data?.offeringById?.createdAt)}
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

            <Text>{data?.offeringById?.category}</Text>

            <Text bold size={16} vertical={[20, 10]}>
              Renseignements
            </Text>

            <OfferingDetailsOnModal details={data?.offeringById?.details} />
            <Block flex={false}>
              <Text bold size={16} vertical={[20, 10]}>
                {data?.offeringById.selectedCandidate
                  ? 'Candidat retenu'
                  : 'Candidats'}
              </Text>
              {data?.offeringById.selectedCandidate ? (
                <TouchableOpacity
                  key={data?.offeringById.selectedCandidate.id}
                  onPress={() =>
                    data?.offeringById.selectedCandidate &&
                    setIsUpdateOnUser(true)
                  }>
                  <SelectedCandidateCard
                    id={data?.offeringById.selectedCandidate.id}
                    avatar={
                      data?.offeringById.selectedCandidate.avatar as string
                    }
                    average={data?.offeringById.selectedCandidate.moyenne}
                    professional={
                      data?.offeringById.selectedCandidate.professional
                    }
                  />
                </TouchableOpacity>
              ) : data?.offeringById.candidates.length ? (
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
              {data?.offeringById.eventday && (
                <EventDay eventday={data?.offeringById.eventday} />
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
              <View style={styles.modal}>
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
                        setIsValidationCodeCorrect={setIsValidationCodeCorrect}
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
                    <Text center bold vertical={25}>
                      Veuillez choisir 3 jours qui vous conviennent
                    </Text>
                    <Calendar parentCallback={setDate} />
                    {date && Object.keys(date).length === 3 && (
                      <Block margin={[20, 20]}>
                        <Button secondary onPress={() => onSubmit()}>
                          <Text bold center>
                            Je chosis ce candidat
                          </Text>
                        </Button>
                      </Block>
                    )}
                  </>
                ) : (
                  <Avis candidateModalId={selectedId} />
                )}
              </View>
            </Modal>
          </Block>
        )}
      </Layout>
    </ScrollView>
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
export default ModalItemManageCandidates;
