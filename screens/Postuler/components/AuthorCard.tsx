import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import { AntDesign } from '@expo/vector-icons';

import { theme } from '../../../constants';
import { useStoreState } from '../../../models';
import { makePseudoName } from '../../../utils';
import {
  Block,
  ImageComponent,
  StatsContainer,
  Text
} from '../../sharedComponents';

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
                  paddingHorizontal: theme.sizes.inouting * 0.6,
                  paddingVertical: theme.sizes.hinouting * 0.6,
                  borderRadius: theme.sizes.radius * 1.6,
                  marginRight: theme.sizes.inouting * 0.6
                }}>
                <AntDesign name="phone" size={theme.sizes.twiceTen} />
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
  container: { width: '100%', marginTop: theme.sizes.hinouting * 0.4 },
  mainLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: theme.sizes.inouting * 1.2
  },

  image: {
    height: theme.sizes.htwiceTen * 3,
    width: theme.sizes.twiceTen * 3,
    borderRadius: theme.sizes.radius * 6,
    overflow: 'hidden'
  },
  modalContainer: {
    margin: 0,
    paddingTop: theme.sizes.hinouting * 0.8,
    justifyContent: 'flex-end',
    overflow: 'hidden'
  },
  modal: {
    paddingHorizontal: theme.sizes.inouting * 0.8,
    flexDirection: 'column',
    height: height * 0.15,
    backgroundColor: 'white',
    borderTopLeftRadius: theme.sizes.border * 2.4,
    borderTopRightRadius: theme.sizes.border * 2.4
  }
});
