import React, { FC, useState } from 'react';
import {
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  View
} from 'react-native';
import {
  Block,
  Text,
  Button,
  Layout,
  TagItem,
  OfferingDetailsOnModal,
  StackedToBottom
} from '../../sharedComponents';
import Modal from 'react-native-modal';
import { useOfferingByIdQuery } from '../../../graphql';
import { formatDateAvis } from '../../../utils';
import UpdateDescription from './UpdateDescription';
import DeleteOffering from './DeleteOffering';
import { useStoreState } from '../../../models';

const { height } = Dimensions.get('screen');

interface Props {
  id?: string;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

type ButtonOption = 'modifier' | 'supprimer' | '';
const ModalItemManageOfferings: FC<Props> = props => {
  const [selectedButton, setSelectedButton] = useState<ButtonOption>();
  const { called, loading, data } = useOfferingByIdQuery({
    variables: { id: props.id as string }
  });
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);

  const onModalClose = () => {
    setSelectedButton('');
  };
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Layout title={'Details'}>
          {(loading && !called) || !data ? (
            <ActivityIndicator size={'large'} />
          ) : (
            <Block flex={false} margin={[0, 25, 48 * 2 + 20]}>
              <Block margin={[0, -25]} flex={false} row middle space={'around'}>
                <TagItem tag={data?.offeringById?.type} type />
                <TagItem tag={data?.offeringById?.category} category />
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
        </Layout>
      </ScrollView>
      <Block margin={[-20, 20]}>
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
        <View style={styles.modal}>
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
              setOpenGlobalModal={props.setOpenModal}
            />
          ) : (
            <Text>Vous ne devriez pas etre içi</Text>
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
    height: height * 0.5,
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  }
});
export default ModalItemManageOfferings;
