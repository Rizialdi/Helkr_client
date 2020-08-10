import React, { Dispatch, SetStateAction, FC } from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Block, Text } from '../../sharedComponents';
import { theme } from '../../../constants';

interface Props {
  recipient: string;
  toOpen: Dispatch<SetStateAction<boolean>>;
}

const NavBarCustom: FC<Props> = ({ recipient, toOpen }) => {
  if (Platform.OS === 'web') {
    return null;
  }

  return (
    <Block flex={false} center row style={styles.header}>
      <Block left style={{ flex: 1 }} center>
        <TouchableOpacity onPress={() => toOpen(false)}>
          <AntDesign name="left" size={theme.sizes.twiceTen * 1.3} />
        </TouchableOpacity>
      </Block>
      <Block style={{ flex: 9 }} padding={[0, theme.sizes.inouting * 0.8]}>
        <Text size={theme.sizes.twiceTen * 1.1}> {recipient} </Text>
      </Block>
    </Block>
  );
};

export default NavBarCustom;

const styles = StyleSheet.create({
  header: {
    height: theme.sizes.htwiceTen * 2.5,
    paddingHorizontal: theme.sizes.hinouting * 0.56,
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
