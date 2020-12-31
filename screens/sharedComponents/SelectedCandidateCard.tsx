import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { AntDesign } from '@expo/vector-icons';

import { theme } from '../../constants';
import { useStoreState } from '../../models';
import Block from './Block';
import Card from './Card';
import ImageComponent from './ImageComponent';
import Text from './Text';

interface Props {
  id: string;
  avatar: string | null;
  average: number;
  professional: boolean;
}

const candidateCard: FC<Props> = ({ professional, average, avatar = null }) => {
  const { themeColors } = useStoreState(store => store.Preferences);

  return (
    <Card shadow>
      <Block flex={false} row>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <ImageComponent image={avatar} style={styles.image} />
        </View>
        <View style={{ flex: 3 }}>
          <Block row space={'around'} center>
            <Text semibold>{average} / 5</Text>
            <Text semibold>{professional ? 'Professionnel' : 'Amateur'}</Text>
            <TouchableOpacity
              //Link to message
              onPress={() => null}
              style={[
                styles.subContainer,
                { backgroundColor: themeColors.secondary }
              ]}>
              <AntDesign name="message1" size={theme.sizes.twiceTen} />
            </TouchableOpacity>
          </Block>
        </View>
      </Block>
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    width: theme.sizes.twiceTen * 3.25,
    height: theme.sizes.htwiceTen * 3.25,
    borderRadius: theme.sizes.radius * 8
  },
  subContainer: {
    paddingHorizontal: theme.sizes.hinouting * 0.6,
    paddingVertical: theme.sizes.hinouting * 0.6,
    borderRadius: theme.sizes.radius * 2
  }
});
export default candidateCard;
