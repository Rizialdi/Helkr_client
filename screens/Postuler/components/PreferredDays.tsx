import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';

import {
  Block,
  Button,
  Card,
  Text,
  StackedToBottom
} from '../../sharedComponents';
import { getDayAndDate } from '../../../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  useChooseEventDayMutation,
  OfferingByIdPostuleesDocument,
  OfferingByIdPostuleesQuery,
  IsCandidateToDocument,
  IsCandidateToQuery
} from '../../../graphql';
import { DataProxy } from 'apollo-cache';

const { height } = Dimensions.get('screen');

interface Props {
  offeringId: string;
  preferredDays: string[];
}
const PreferredDays: React.FC<Props> = ({ offeringId, preferredDays }) => {
  const [clickedDayIdx, setClickedDayIdx] = useState<number | null>(null);

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
      .then(({ data }) => {
        if (data?.chooseEventDay) {
          // SUCCESS MODAL TODO
        } else {
          // ERROR MODAL TODO
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
                  <Text bold vertical={[0, 5]}>
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
                <Text caption align={'justify'} vertical={[20, 10]}>
                  En cliquant sur Je confirme, vous vous engagez à vous
                  presenter chez le client pour la réalisation de la prestation.
                  Le non-respect de cet engagement pourrait entrainer la
                  suspension de votre compte.
                </Text>
              </>
            )}
          </View>
          <StackedToBottom margin={[0, 20]}>
            <Button secondary onPress={() => onSubmit()}>
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
    paddingTop: 20,
    justifyContent: 'flex-end',
    overflow: 'hidden'
  },
  modal: {
    paddingHorizontal: 20,
    flexDirection: 'column',
    height: height * 0.3,
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  }
});

export default PreferredDays;
