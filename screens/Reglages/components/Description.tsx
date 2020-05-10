import React, { useState } from 'react';

import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { theme } from '../../../constants';
export default ({ description, parentCallback }) => {
  const [text, setText] = useState(null);

  const onChange = (text) => {
    setText(text);
    parentCallback(text);
  };
  return (
    <ScrollView>
      <View style={[styles.description]}>
        <Text
          style={[
            styles.text,
            { fontWeight: '300', fontSize: 24, paddingLeft: 20 }
          ]}
        >
          Description
        </Text>
        <TextInput
          placeholder={description ? '' : 'Ajouter une bio.'}
          style={[styles.text, styles.subText2]}
          maxLength={300}
          multiline={true}
          value={text ? text : description ? description : ''}
          onChangeText={(text) => onChange(text)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  description: {
    marginTop: 10
  },
  text: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D'
  },

  subText2: {
    fontSize: theme.sizes.body,
    color: '#AEB5BC',
    fontWeight: '500',
    textAlign: 'justify',
    paddingHorizontal: 20,
    marginTop: 10
  }
});
