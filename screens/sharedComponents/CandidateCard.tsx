import React, { FC } from 'react';
import { Image, View, StyleSheet } from 'react-native';

import Text from './Text';
import Block from './Block';
import Icon from 'react-native-vector-icons/AntDesign';
import { CandidateCardClickedPart } from '../Manage/components/ModalItemManageCandidates';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStoreState } from '../../models';
import Card from './Card';

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
  const { themeColors } = useStoreState(store => store.Preferences);
  return (
    <Card shadow>
      <Block flex={true} row>
        <View style={{ flex: 1 }}>
          <Image
            source={
              avatar
                ? { uri: avatar }
                : require('../../assets/images/defaultUserImage.png')
            }
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={{ flex: 3 }}>
          <Block row space={'around'} center>
            <Text semibold>{average} / 5</Text>
            <Text semibold>{professional ? 'Professionnel' : 'Amateur'}</Text>
            <TouchableOpacity
              onPress={() => {
                parentCallback('icon'), setSelectedId(id);
              }}
              style={[
                styles.image,
                { backgroundColor: themeColors.secondary }
              ]}>
              <Icon name="right" size={20} />
            </TouchableOpacity>
          </Block>
        </View>
      </Block>
    </Card>
  );
};

const styles = StyleSheet.create({
  image: { width: '100%', height: '100%' },
  icon: {
    padding: 15,
    borderRadius: 10
  }
});

export default candidateCard;
