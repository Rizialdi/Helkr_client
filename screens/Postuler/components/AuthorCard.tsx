import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';

import { Text, Block, ImageComponent } from '../../sharedComponents';
import { makePseudoName } from '../../../utils';
import Icon from 'react-native-vector-icons/AntDesign';
import { useStoreState } from '../../../models';
import * as Linking from 'expo-linking';
import Modal from 'react-native-modal';
import { StatsContainer } from '../../sharedComponents';
const { height } = Dimensions.get('screen');
interface author {
  id: string;
  nom: string;
  prenom: string;
  numero: string;
  avatar?: string;
  address: string | null;
}
export default ({ id, nom, prenom, avatar, numero, address }: author) => {
  const { themeColors } = useStoreState(store => store.Preferences);
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);
  const [clicked, setClicked] = useState(false);
  const _pressCall = (numero: string) => {
    const url = `tel://${numero}`;
    Linking.openURL(url);
  };
  return (
    <>
      <TouchableOpacity onPress={() => setClicked(true)}>
        <Block flex row>
          <Block center>
            <ImageComponent image={avatar} style={styles.image} />
          </Block>
          <View style={{ flex: 3 }}>
            <Block row space={'between'} center>
              <View>
                <Text bold>{makePseudoName(nom, prenom)}</Text>
                <Text caption>
                  {address ? address : 'Aucune adresse renseignée'}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => _pressCall(numero)}
                style={{
                  backgroundColor: themeColors.secondary,
                  padding: 15,
                  borderRadius: 10,
                  marginRight: 15
                }}>
                <Icon name="phone" size={20} />
              </TouchableOpacity>
            </Block>
          </View>
        </Block>
      </TouchableOpacity>

      <Modal
        isVisible={clicked}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        useNativeDriver
        style={styles.modalContainer}
        backdropColor={'#C1BEC0'}
        onBackButtonPress={() => setClicked(false)}
        onBackdropPress={() => setClicked(false)}
        onSwipeComplete={() => setClicked(false)}>
        <>
          {netWorkStatus && (
            <View style={styles.modal}>
              <StatsContainer id={id} offeringAuthorStars />
            </View>
          )}
        </>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', marginTop: 10 },
  mainLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30
  },

  image: {
    height: '100%',
    width: '100%',
    borderRadius: 50
  },
  modalContainer: {
    margin: 0,
    paddingTop: 20,
    justifyContent: 'flex-end',
    overflow: 'hidden'
  },
  modal: {
    paddingHorizontal: 20,
    flexDirection: 'column',
    height: height * 0.15,
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  }
});
