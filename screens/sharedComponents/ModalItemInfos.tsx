import React, { SFC, useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Text from './Text';
import Button from './Button';
import Block from './Block';
import { theme } from '../../constants';

interface Props {
  timer: number;
  information: string;
  description: string;
  buttonMessage?: string;
  callBackParams?: any[];
  errorReporting?: boolean;
  callBack?: (a: string | number[]) => void;
}
const ModalItem: SFC<Props> = ({
  timer,
  information,
  description,
  buttonMessage,
  callBack,
  callBackParams,
  errorReporting
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const count = useRef(0);
  useEffect(() => {
    count.current === 0 &&
      setTimeout(() => {
        setModalVisible(!modalVisible);
      }, timer * 1000);

    count.current = count.current + 1;
  }, [modalVisible]);

  const onCloseModal = () => {
    //@ts-ignore // TODO an issue ?
    callBack && callBack(callBackParams);
    setModalVisible(false);
  };

  return (
    <Modal
      isVisible={modalVisible}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      useNativeDriver
      style={styles.modalContainer}
      backdropColor={'#C1BEC0'}
      onBackButtonPress={() => onCloseModal()}
      onBackdropPress={() => onCloseModal()}
      onSwipeComplete={() => onCloseModal()}>
      <View style={[styles.modal]}>
        <Text bold h3 center>
          {information}
        </Text>
        <Text>{description}</Text>
        <Block flex={false}>
          <Button
            secondary={!errorReporting}
            accent={errorReporting}
            style={{ width: '100%' }}
            onPress={() => onCloseModal()}>
            <Text bold header center>
              {buttonMessage ? buttonMessage : 'Fermer'}
            </Text>
          </Button>
        </Block>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  modal: {
    flexDirection: 'column',
    marginHorizontal: theme.sizes.htwiceTen * 1.5,
    paddingHorizontal: theme.sizes.inouting,
    paddingVertical: theme.sizes.hinouting * 0.6,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: theme.sizes.radius * 2,
    height: theme.sizes.screenHeight * 0.25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: theme.sizes.border
  }
});

export default ModalItem;
