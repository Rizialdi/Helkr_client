import React, { Dispatch, SetStateAction } from 'react';
import { Text, Platform, StyleSheet, TouchableOpacity } from 'react-native';

import { FC } from 'react';
import { Block } from '../../sharedComponents';
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
      <Block left style={{ flex: 2 }}>
        <TouchableOpacity onPress={() => toOpen(false)}>
          <Icon name="left" size={24} />
        </TouchableOpacity>
      </Block>
      <Block style={{ flex: 8 }}>
        <Text style={styles.recipient}> {recipient} </Text>
      </Block>
    </Block>
  );
};

export default NavBarCustom;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 14,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5
  },
  recipient: {
    fontSize: 18,
    marginVertical: 14
  }
});
