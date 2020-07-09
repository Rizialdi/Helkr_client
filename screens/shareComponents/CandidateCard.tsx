import React, { FC } from 'react';
import { StyleSheet, Image, View } from 'react-native';

import Text from './Text';
import Block from './Block';
import Icon from 'react-native-vector-icons/AntDesign';
import { CandidateCardClickedPart } from '../Manage/components/ModalItemManageCandidates';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  id: string;
  avatar: string | null;
  average: number;
  professional: boolean;
  parentCallback: React.Dispatch<
    React.SetStateAction<CandidateCardClickedPart>
  >;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}

const candidateCard: FC<Props> = ({
  professional,
  average,
  avatar = null,
  id,
  parentCallback,
  setSelectedId
}) => {
  return (
    <Block
      flex={false}
      row
      gray
      padding={5}
      margin={[15, 0]}
      style={[styles.candidateView, styles.shadow, { borderRadius: 6 }]}>
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
            onPress={() => {
              parentCallback('icon'), setSelectedId(id);
            }}
            style={{ backgroundColor: 'red', padding: 15 }}>
            <Icon name="right" size={15} />
          </TouchableOpacity>
        </Block>
      </View>
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
