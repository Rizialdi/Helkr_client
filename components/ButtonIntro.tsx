import React, { Component, FC } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  GestureResponderEvent
} from 'react-native';

interface Props {
  onPress: (event: GestureResponderEvent) => void | undefined;
  text: string;
}
const ButtonIntro: FC<Props> = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{text.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    borderColor: 'black',
    paddingHorizontal: 50,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 148, 255, 1)'
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'josefinRegular'
  }
});

export default ButtonIntro;
