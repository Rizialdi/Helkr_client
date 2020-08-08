import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

import Text from './Text';
import Block from './Block';
import Icon from 'react-native-vector-icons/AntDesign';
import { CandidateCardClickedPart } from '../Manage/components/ModalItemManageCandidates';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStoreState } from '../../models';
import Card from './Card';
import ImageComponent from './ImageComponent';

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
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);
  return (
    <Card shadow>
      <Block flex={true} row>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <ImageComponent image={avatar} style={styles.imageItem} />
        </View>
        <View style={{ flex: 3 }}>
          <Block row space={'around'} center>
            <Text semibold>{average} / 5</Text>
            <Text semibold>{professional ? 'Professionnel' : 'Amateur'}</Text>
            <TouchableOpacity
              disabled={!netWorkStatus}
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
  image: { justifyContent: 'center', padding: 15, borderRadius: 10 },
  imageItem: {
    width: 65,
    height: 65,
    borderRadius: 35
  },
  icon: {
    padding: 50,
    borderRadius: 10
  }
});

export default candidateCard;
