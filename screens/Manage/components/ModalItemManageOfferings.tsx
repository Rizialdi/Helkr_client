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
  OfferingDetailsOnModal
} from '../../shareComponents';
import Modal from 'react-native-modal';
import { useOfferingByIdQuery } from '../../../graphql';
import { formatDateAvis } from '../../../utils';
import UpdateDescription from './UpdateDescription';
import DeleteOffering from './DeleteOffering';

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
  const onModalClose = () => {
    setSelectedButton('');
  };
  return (
    <ScrollView>
      <Layout title={'Details'}>
        {loading && !called ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <Block flex={false} margin={[0, 25]}>
            <Block margin={[0, -25]} flex={false} row middle space={'around'}>
              <TagItem tag={data?.offeringById?.type} type />
              <TagItem tag={data?.offeringById?.category} category />
              <TagItem
                tag={
                  data?.offeringById.updatedAt
                    ? formatDateAvis(data?.offeringById?.updatedAt)
                    : formatDateAvis(data?.offeringById?.createdAt)
                }
                date
              />
            </Block>
            <Text bold size={16} vertical={[20, 10]}>
              Description
            </Text>

            <Text>{data?.offeringById?.description}</Text>

            <Text bold size={16} vertical={[20, 10]}>
              Categories
            </Text>
            <OfferingDetailsOnModal details={data?.offeringById?.details} />
            <Button secondary onPress={() => setSelectedButton('modifier')}>
              <Text bold center>
                Modifier
              </Text>
            </Button>

            <Button accent onPress={() => setSelectedButton('supprimer')}>
              <Text bold center>
                Supprimer
              </Text>
            </Button>
          </Block>
        )}
      </Layout>
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
              setOpenGlobalModal={props?.setOpenModal}
            />
          ) : (
            <Text>Vous ne devriez pas etre içi</Text>
          )}
        </View>
      </Modal>
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
    height: height * 0.5,
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  }
});
export default ModalItemManageOfferings;
