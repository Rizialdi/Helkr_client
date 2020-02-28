/**
 * Button component
 * Renders a button and calls a function passed via onPress prop once tapped
 */

import React, { Component } from "react";
import {
  StyleSheet, // CSS-like styles
  Text, // Renders text
  TouchableOpacity, // Pressable container
  View // Container component
} from "react-native";

export default class ButtonIntro extends Component {
  render({ onPress } = this.props) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.text}>{this.props.text.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  // Button container
  button: {
    borderRadius: 5,
    borderColor: "black",
    paddingHorizontal: 50,
    paddingVertical: 10,
    backgroundColor: "rgba(0, 148, 255, 1)"
  },
  // Button text
  text: {
    color: "black",
    fontWeight: "bold",
    fontFamily: "josefinRegular"
  }
});
