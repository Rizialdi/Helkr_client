import React, { Dispatch, SetStateAction } from 'react';
import { Text, Platform, StyleSheet, TouchableOpacity } from 'react-native';

import { FC } from 'react';
import { Block } from '../../shareComponents';
import Icon from 'react-native-vector-icons/AntDesign';
interface Props {
  recipient: string;
  toOpen: Dispatch<SetStateAction<boolean>>;
}

const NavBarCustom: FC<Props> = ({ recipient, toOpen }) => {
  if (Platform.OS === 'web') {
    return null;
  }

  return (
    <Block flex={false} style={styles.header}>
      <Block>
        <TouchableOpacity onPress={() => toOpen(false)}>
          <Icon name="arrowleft" size={24} />
        </TouchableOpacity>
      </Block>
      <Block style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.recipient}>{recipient}</Text>
      </Block>
    </Block>
  );
};

export default NavBarCustom;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    height: 50,
    paddingHorizontal: 14
  },
  recipient: {
    fontSize: 18,
    marginVertical: 14
  }
});
