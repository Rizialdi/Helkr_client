import React, { SFC, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import Modal from 'react-native-modal';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { theme } from '../../../constants';
import { useOfferingByIdQuery } from '../../../graphql';
import { useStoreState } from '../../../models';
import { DetailOfferingParamsList } from '../../../navigation/Routes';
import { formatDateAvis } from '../../../utils';
import {
  Block,
  Button,
  OfferingDetailsOnModal,
  OfferingLoadingIndicator,
  StackedToBottom,
  TagItem,
  Text
} from '../../sharedComponents';
import DeleteOffering from './DeleteOffering';
import UpdateDescription from './UpdateDescription';

interface Props {
  route?: RouteProp<DetailOfferingParamsList, 'MyOfferingsModal'>;
  navigation?: StackNavigationProp<
    DetailOfferingParamsList,
    'MyOfferingsModal'
  >;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

type ButtonOption = 'modifier' | 'supprimer' | '';

const MyOfferinsgModal: SFC<Props> = ({ route, navigation }) => {
  const [selectedButton, setSelectedButton] = useState<ButtonOption>();
  const { error, loading, data } = useOfferingByIdQuery({
    variables: { id: route?.params.id as string }
  });
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);

  const onModalClose = () => {
    setSelectedButton('');
  };

  return (
    <Block white>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block>
          {error && (
            <Text center style={{ marginTop: theme.sizes.htwiceTen * 1.25 }}>
              Une erreur s'est produite sur le réseau.
            </Text>
          )}
          {loading || !data ? (
            <Block padding={[theme.sizes.base, theme.sizes.base * 1.5]}>
              <OfferingLoadingIndicator />
            </Block>
          ) : (
            <Block
              flex={false}
              margin={[0, theme.sizes.inouting, theme.sizes.hinouting * 2.8]}>
              <Block
                margin={[0, -theme.sizes.inouting]}
                flex={false}
                row
                middle
                space={'around'}>
                <TagItem tag={data?.offeringById?.type} type />
                <TagItem tag={data?.offeringById?.category} category />
                {data?.offeringById?.updatedAt &&
                  formatDateAvis(data?.offeringById?.updatedAt) && (
                    <TagItem
                      tag={
                        data?.offeringById.updatedAt
                          ? formatDateAvis(data?.offeringById?.updatedAt)
                          : data?.offeringById.createdAt
                          ? formatDateAvis(data?.offeringById?.createdAt)
                          : ''
                      }
                      date
                    />
                  )}
              </Block>

              <Text
                bold
                size={theme.sizes.base}
                vertical={[theme.sizes.htwiceTen, theme.sizes.twiceTen / 2]}>
                Catégorie
              </Text>
              <Text horizontal={20}>{data?.offeringById?.category}</Text>

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
              <Text horizontal={20}>{data?.offeringById?.description}</Text>
            </Block>
          )}
        </Block>
      </ScrollView>
      {!error && !loading && data && (
        <Block margin={[0, theme.sizes.twiceTen * 1]}>
          <StackedToBottom>
            <Button
              disabled={!netWorkStatus}
              secondary
              onPress={() => setSelectedButton('modifier')}>
              <Text bold center>
                Modifier
              </Text>
            </Button>

            <Button
              disabled={!netWorkStatus}
              accent
              onPress={() => setSelectedButton('supprimer')}>
              <Text bold center>
                Supprimer
              </Text>
            </Button>
          </StackedToBottom>
        </Block>
      )}

      <Modal
        isVisible={!!selectedButton}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        useNativeDriver
        style={styles.modalContainer}
        backdropColor={'#C1BEC0'}
        onBackButtonPress={() => onModalClose()}
        onBackdropPress={() => onModalClose()}
        onSwipeComplete={() => onModalClose()}>
        <KeyboardAvoidingView behavior={'padding'}>
          <View
            style={[
              styles.modal,
              {
                height:
                  selectedButton === 'modifier'
                    ? theme.sizes.screenHeight * 0.4
                    : theme.sizes.screenHeight * 0.25
              }
            ]}>
            {selectedButton === 'modifier' ? (
              <UpdateDescription
                id={data?.offeringById.id}
                closeModal={onModalClose}
                previousValue={data?.offeringById.description}
              />
            ) : selectedButton === 'supprimer' ? (
              <DeleteOffering
                id={data?.offeringById.id}
                closeModal={onModalClose}
                navigationBack={navigation ? navigation.goBack : () => null}
              />
            ) : (
              <Text>Vous ne devriez pas etre içi</Text>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </Block>
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
    borderTopLeftRadius: theme.sizes.base * 0.75,
    borderTopRightRadius: theme.sizes.base * 0.75
  }
});

export default MyOfferinsgModal;
