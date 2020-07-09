import React, { useState, useEffect, FC } from 'react';
import { ActivityIndicator, StyleSheet, Dimensions, View } from 'react-native';
import Modal from 'react-native-modal';
import { Calendar } from '../../shareComponents';

import {
  Text,
  Layout,
  Block,
  TagItem,
  CandidateCard,
  SelectedCandidateCard
} from '../../shareComponents';
import { useOfferingByIdQuery } from '../../../graphql';
import { formatDateAvis } from '../../../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Avis from '../../Avis';
import { LocalDateObject } from '../../shareComponents/Calendar';
import Button from '../../shareComponents/Button';
import { useChooseCandidateMutation } from '../../../graphql/helpkr-types';
const { height } = Dimensions.get('screen');

interface Props {
  id?: string;
}

export type CandidateCardClickedPart = '' | 'icon';

const ModalItemManageCandidates: FC<Props> = props => {
  const [selectedId, setSelectedId] = useState<string>('');
  const { called, loading, data } = useOfferingByIdQuery({
    variables: { id: props.id as string }
  });
  console.log('selectedId', selectedId);
  const [chooseCandidate] = useChooseCandidateMutation();
  const [isUpdateOnUser, setIsUpdateOnUser] = useState<boolean>(false);
  const [date, setDate] = useState<LocalDateObject | null>(null);
  const [candidateCardClickedPart, setCandidateCardClickedPart] = useState<
    CandidateCardClickedPart
  >('');

  const onModalClose = () => {
    setDate({});
    setSelectedId('');
    setCandidateCardClickedPart('');
  };

  return (
    <Layout title={'Details'}>
      {loading && !called ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <Block flex={false} margin={[0, 25]}>
          <Block margin={[0, -25]} flex={false} row middle space={'around'}>
            <TagItem tag={data?.offeringById?.type} type />
            <TagItem tag={data?.offeringById?.category} category />
            <TagItem tag={formatDateAvis(data?.offeringById?.createdAt)} date />
          </Block>
          <Text style={{ marginVertical: 15 }}>
            {data?.offeringById?.description}
          </Text>
          <Text style={{ marginVertical: 15 }}>
            {JSON.stringify(data?.offeringById?.details)}
          </Text>
          <Block flex={false}>
            <Text bold size={16}>
              Candidats
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
                  avatar={data?.offeringById.selectedCandidate.avatar as string}
                  average={data?.offeringById.selectedCandidate.moyenne}
                  professional={
                    data?.offeringById.selectedCandidate.professional
                  }
                />
              </TouchableOpacity>
            ) : (
              data?.offeringById.candidates.length &&
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
              <Text center bold vertical={25}>
                Dites nous tout
              </Text>
              <Block flex={false} margin={[20, 20]}>
                <Button secondary>
                  <Text bold center>
                    Marquer comme terminé
                  </Text>
                </Button>
                <Button accent>
                  <Text bold center>
                    Signaler un problème
                  </Text>
                </Button>
              </Block>
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
                      <Button
                        secondary
                        onPress={() =>
                          chooseCandidate({
                            variables: {
                              id: props.id as string,
                              candidateId: selectedId
                            }
                          })
                            .then(({ data }) => data?.chooseCandidate)
                            .then(data => {
                              console.log(data);
                              try {
                                if (data) {
                                  onModalClose();
                                } else {
                                  //Modal ou information -> choix candidat impossible
                                }
                              } catch (error) {
                                throw new Error(
                                  `Impossible de choisir le Candidate ${error}`
                                );
                              }
                            })
                        }>
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
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    paddingTop: 20,
    justifyContent: 'flex-end'
  },
  modal: {
    flexDirection: 'column',
    height: height * 0.75,
    padding: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  }
});
export default ModalItemManageCandidates;
