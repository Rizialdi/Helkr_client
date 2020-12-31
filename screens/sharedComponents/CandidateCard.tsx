import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import Text from './Text';
import Block from './Block';
import { CandidateCardClickedPart } from '../Manage/components/MyCandidateToOffering';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStoreState } from '../../models';
import Card from './Card';
import ImageComponent from './ImageComponent';
import { theme } from '../../constants';

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
              <AntDesign name="right" size={theme.sizes.twiceTen} />
            </TouchableOpacity>
          </Block>
        </View>
      </Block>
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    justifyContent: 'center',
    paddingHorizontal: theme.sizes.inouting * 0.6,
    paddingVertical: theme.sizes.hinouting * 0.6,
    borderRadius: theme.sizes.radius * 1.7
  },
  imageItem: {
    width: theme.sizes.inouting * 2.6,
    height: theme.sizes.hinouting * 2.6,
    borderRadius: theme.sizes.radius * 7
  },
  icon: {
    paddingHorizontal: theme.sizes.inouting * 2,
    paddingVertical: theme.sizes.hinouting * 2,
    borderRadius: theme.sizes.radius * 1.7
  }
});

export default candidateCard;
