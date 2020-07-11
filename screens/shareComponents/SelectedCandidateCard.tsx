import React, { FC } from 'react';
import { StyleSheet, Image, View } from 'react-native';

import Text from './Text';
import Block from './Block';
import Icon from 'react-native-vector-icons/AntDesign';
import { CandidateCardClickedPart } from '../Manage/components/ModalItemManageCandidates';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStoreState } from '../../models';

interface Props {
  id: string;
  avatar: string | null;
  average: number;
  professional: boolean;
}

const candidateCard: FC<Props> = ({
  professional,
  average,
  avatar = null,
  id
}) => {
  const { themeColors } = useStoreState(store => store.Preferences);

  return (
    <Block
      padding={8}
      style={{
        borderRadius: 6,
        backgroundColor: '#d8eaed',
        marginTop: 10,
        marginBottom: 5
      }}>
      <Block
        flex={false}
        row
        margin={[0, 0]}
        padding={5}
        style={[
          styles.candidateView,
          { borderRadius: 6, backgroundColor: themeColors.white }
        ]}>
        <View style={{ flex: 1 }}>
          <Image
            source={
              avatar
                ? { uri: avatar }
                : require('../../assets/images/default-user-image.png')
            }
            resizeMode="contain"
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <View style={{ flex: 3, borderRadius: 6 }}>
          <Block row space={'around'} center>
            <Text semibold>{average} / 5</Text>
            <Text semibold>{professional ? 'Professionnel' : 'Amateur'}</Text>
            <TouchableOpacity
              //Link to message
              onPress={() => null}
              style={{
                backgroundColor: themeColors.secondary,
                padding: 15,
                borderRadius: 10
              }}>
              <Icon name="message1" size={20} />
            </TouchableOpacity>
          </Block>
        </View>
      </Block>
    </Block>
  );
};

export default candidateCard;

const styles = StyleSheet.create({
  candidateView: {
    flexDirection: 'row',
    height: 80
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.1,
    shadowRadius: 4
  }
});
