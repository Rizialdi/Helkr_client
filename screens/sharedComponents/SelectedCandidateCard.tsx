import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import Text from './Text';
import Block from './Block';
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStoreState } from '../../models';
import Card from './Card';
import ImageComponent from './ImageComponent';

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
        <View style={{ flex: 1 }}>
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
              <Icon name="message1" size={20} />
            </TouchableOpacity>
          </Block>
        </View>
      </Block>
    </Card>
  );
};

const styles = StyleSheet.create({
  image: { width: '100%', height: '100%' },
  subContainer: {
    padding: 15,
    borderRadius: 10
  }
});
export default candidateCard;
