import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { theme } from '../../../constants';
import { Text } from '../../sharedComponents';

interface Props {
  description: string | null | undefined;
  parentCallback: (a: string) => void;
}
export default ({ description, parentCallback }: Props) => {
  const [text, setText] = useState<string>('');

  useEffect(() => {
    description && onChange(description);
  }, [description]);

  const onChange = (text: string) => {
    setText(text);
    parentCallback(text);
  };
  return (
    <ScrollView>
      <View style={[styles.description]}>
        <Text
          medium
          style={[
            styles.text,
            {
              fontSize: theme.sizes.twiceTen * 1.2,
              paddingLeft: theme.sizes.inouting * 0.8
            }
          ]}>
          Description
        </Text>
        <TextInput
          placeholder={text ? text : 'Ajouter une bio.'}
          style={[styles.text, styles.subText2]}
          maxLength={300}
          multiline={true}
          value={text ? text : ''}
          onChangeText={text => onChange(text)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  description: {
    marginTop: theme.sizes.hinouting * 0.4
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
    paddingHorizontal: theme.sizes.inouting * 0.8,
    marginTop: theme.sizes.hinouting * 0.4
  }
});
