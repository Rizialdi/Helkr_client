import React, { FC, useState } from 'react';
import {
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  View,
  KeyboardAvoidingView
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
import { theme } from '../../../constants';

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
        <Layout
          title={'Details'}
          iconName="close"
          callBack={props.setOpenModal}
          callBackParams={[false]}>
          {(loading && !called) || !data ? (
            <ActivityIndicator size={'large'} />
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
                vertical={[theme.sizes.htwiceTen, theme.sizes.htwiceTen / 2]}>
                Description
              </Text>
              <Text>{data?.offeringById?.description}</Text>

              <Text
                bold
                size={theme.sizes.base}
                vertical={[theme.sizes.htwiceTen, theme.sizes.twiceTen / 2]}>
                Categorie
              </Text>

              <OfferingDetailsOnModal details={data?.offeringById?.details} />
            </Block>
          )}
        </Layout>
      </ScrollView>
      <Block margin={[-theme.sizes.htwiceTen, theme.sizes.twiceTen]}>
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
                setOpenGlobalModal={props.setOpenModal}
              />
            ) : (
              <Text>Vous ne devriez pas etre içi</Text>
            )}
          </View>
        </KeyboardAvoidingView>
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
    borderTopLeftRadius: theme.sizes.base * 0.75,
    borderTopRightRadius: theme.sizes.base * 0.75
  }
});
export default ModalItemManageOfferings;
