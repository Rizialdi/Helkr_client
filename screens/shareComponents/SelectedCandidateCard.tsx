import React, { FC } from 'react';
import { StyleSheet, Image, View } from 'react-native';

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
}

const candidateCard: FC<Props> = ({
  professional,
  average,
  avatar = null,
  id
}) => {
  const { themeColors } = useStoreState(store => store.Preferences);

  return (
    <Card shadow>
      <Block flex={false} row>
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
        <View style={{ flex: 3 }}>
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
    </Card>
  );
};

export default candidateCard;
