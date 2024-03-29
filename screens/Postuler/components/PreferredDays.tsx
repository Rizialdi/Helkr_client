import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';

import {
  Block,
  Button,
  Card,
  Text,
  StackedToBottom,
  ModalItemInfos
} from '../../sharedComponents';
import { DataProxy } from 'apollo-cache';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  useChooseEventDayMutation,
  OfferingByIdPostuleesDocument,
  OfferingByIdPostuleesQuery,
  IsCandidateToDocument,
  IsCandidateToQuery
} from '../../../graphql';
import { useStoreState } from '../../../models';
import { getDayAndDate } from '../../../utils';
import { theme } from '../../../constants';
interface Props {
  offeringId: string;
  preferredDays: string[];
}
const PreferredDays: React.FC<Props> = ({ offeringId, preferredDays }) => {
  const [clickedDayIdx, setClickedDayIdx] = useState<number | null>(null);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);

  const [choosEventDay, { loading, error }] = useChooseEventDayMutation();

  const updateCache = (cache: DataProxy) => {
    if (!offeringId || !(clickedDayIdx != null)) return;
    const dataIsCandidateTo = cache.readQuery({
      query: IsCandidateToDocument,
      variables: {}
    }) as IsCandidateToQuery | undefined;

    const dataOfferingByIdPostulee = cache.readQuery({
      query: OfferingByIdPostuleesDocument,
      variables: { id: offeringId }
    }) as OfferingByIdPostuleesQuery | undefined;

    const newDataPostulee = {
      ...dataOfferingByIdPostulee,
      offeringById: {
        ...dataOfferingByIdPostulee?.offeringById,
        eventday: preferredDays[clickedDayIdx]
      }
    };

    const newDataIsCandidateTo = {
      ...dataIsCandidateTo,
      isCandidateTo: dataIsCandidateTo?.isCandidateTo.map(item => {
        if (item.id != offeringId) return item;
        return { ...item, eventday: preferredDays[clickedDayIdx] };
      })
    };

    cache.writeQuery({
      query: IsCandidateToDocument,
      variables: {},
      data: newDataIsCandidateTo
    });

    cache.writeQuery({
      query: OfferingByIdPostuleesDocument,
      variables: { id: offeringId },
      data: newDataPostulee
    });
  };

  const onSubmit = () => {
    if (!offeringId || !(clickedDayIdx != null)) return;
    choosEventDay({
      variables: { id: offeringId, timestamp: preferredDays[clickedDayIdx] },
      update: updateCache
    })
      .then(({ data, errors }) => {
        if (data?.chooseEventDay) {
          // SUCCESS MODAL TODO
          // Updating the cache automatically closes that
        }
        if (errors || error) {
          setErrorModal(true);
        }
      })
      .catch(err => {
        throw new Error(`${error} - ${err}`);
      });
  };
  return (
    <>
      <Block space={'around'} row>
        {preferredDays.map((item, key) => {
          const [dayOfWeek, day, month] = getDayAndDate(item);
          return (
            <TouchableOpacity key={key} onPress={() => setClickedDayIdx(key)}>
              <Block center>
                <Card shadow center secondary={key === clickedDayIdx}>
                  <Text bold vertical={[0, theme.sizes.hinouting / 4]}>
                    {dayOfWeek}
                  </Text>
                  <Text>{day}</Text>
                  <Text>{month}</Text>
                </Card>
              </Block>
            </TouchableOpacity>
          );
        })}
      </Block>
      {!clickedDayIdx && (
        <Text caption align={'justify'}>
          Veuillez cliquer sur une carte pour choisir le jour qui vous convient.
          Noter qu'il peut-être utile d'appeler l'auteur avant de faire ce
          choix.
        </Text>
      )}
      {errorModal && (
        <ModalItemInfos
          errorReporting
          information={'Erreur'}
          description={
            "Une erreur s'est produite au moment de votre choix de jour. Veuillez réessayer plus tard."
          }
          timer={1}
          callBack={setClickedDayIdx}
          callBackParams={[null]}
        />
      )}
      <Modal
        isVisible={clickedDayIdx != null}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        useNativeDriver
        style={styles.modalContainer}
        backdropColor={'#C1BEC0'}
        onBackButtonPress={() => setClickedDayIdx(null)}
        onBackdropPress={() => setClickedDayIdx(null)}
        onSwipeComplete={() => setClickedDayIdx(null)}>
        <>
          <View style={styles.modal}>
            {clickedDayIdx != null && (
              <>
                <Text bold align={'justify'}>{` Voulez-vous confirmer le ${
                  getDayAndDate(preferredDays[clickedDayIdx])[1]
                } ${
                  getDayAndDate(preferredDays[clickedDayIdx])[2]
                } comme jour de la prestation ?`}</Text>
                <Text
                  caption
                  align={'justify'}
                  vertical={[
                    theme.sizes.hinouting * 0.8,
                    theme.sizes.hinouting * 0.4
                  ]}>
                  En cliquant sur Je confirme, vous vous engagez à vous
                  presenter chez le client pour la réalisation de la prestation.
                  Le non-respect de cet engagement pourrait entrainer la
                  suspension de votre compte.
                </Text>
              </>
            )}
          </View>
          <StackedToBottom margin={[0, theme.sizes.inouting * 0.8]}>
            <Button
              secondary
              disabled={!netWorkStatus}
              onPress={() => onSubmit()}>
              {loading ? (
                <ActivityIndicator size={'small'} />
              ) : (
                <Text center bold>
                  Je confirme
                </Text>
              )}
            </Button>
          </StackedToBottom>
        </>
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
    paddingHorizontal: theme.sizes.inouting * 0.8,
    flexDirection: 'column',
    height: theme.sizes.screenHeight * 0.3,
    backgroundColor: 'white',
    borderTopLeftRadius: theme.sizes.radius * 2,
    borderTopRightRadius: theme.sizes.radius * 2
  }
});

export default PreferredDays;
