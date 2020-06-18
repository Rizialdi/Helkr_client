import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";

import { theme } from "../../../constants";
import { Text } from "../../shareComponents";

interface Props {
  description: string;
  parentCallback: (a: string) => void;
}
export default ({ description, parentCallback }: Props) => {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    onChange(description);
  }, [description]);

  const onChange = (text: string) => {
    setText(text);
    parentCallback(text);
  };
  return (
    <ScrollView>
      <View style={[styles.description]}>
        <Text
          style={[
            styles.text,
            { fontWeight: "300", fontSize: 24, paddingLeft: 20 },
          ]}
        >
          Description
        </Text>
        <TextInput
          placeholder={text ? text : "Ajouter une bio."}
          style={[styles.text, styles.subText2]}
          maxLength={300}
          multiline={true}
          value={text ? text : ""}
          onChangeText={(text) => onChange(text)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  description: {
    marginTop: 10,
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },

  subText2: {
    fontSize: theme.sizes.body,
    color: "#AEB5BC",
    fontWeight: "500",
    textAlign: "justify",
    paddingHorizontal: 20,
    marginTop: 10,
  },
});
