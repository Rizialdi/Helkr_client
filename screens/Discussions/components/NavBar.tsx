import React, { Dispatch, SetStateAction } from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';

import { FC } from 'react';
import { Block, Text } from '../../sharedComponents';
import { AntDesign } from '@expo/vector-icons';

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
          <AntDesign name="left" size={26} />
        </TouchableOpacity>
      </Block>
      <Block style={{ flex: 9 }} padding={[0, 20]}>
        <Text size={22}> {recipient} </Text>
      </Block>
    </Block>
  );
};

export default NavBarCustom;

const styles = StyleSheet.create({
  header: {
    height: 50,
    paddingHorizontal: 14,
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
