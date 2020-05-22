import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../../constants';

const mark: string[] = [
  'A éviter',
  'Décevant',
  'Passable',
  'Bien',
  'Très bien',
  'Parfait'
];

const yearMonths: string[] = [
  'jan.',
  'fev.',
  'mar.',
  'avr.',
  'mai',
  'jui.',
  'juil.',
  'aou.',
  'sep.',
  'oct.',
  'nov.',
  'dec.'
];

const formatDate = (timestamp: string = '15886987435') => {
  const date = new Date(parseInt(timestamp));
  return yearMonths[date.getMonth()] + ' ' + date.getFullYear();
};
export default ({
  scorer = 'John D.',
  score = 0,
  comment = 'Agreable',
  createdAt = Date.now().toString(),
  avatar = null
}) => (
  <TouchableOpacity style={styles.container}>
    <View style={styles.mainLine}>
      <Text style={{ fontSize: 16, fontWeight: '500' }}>{scorer}</Text>
      <Image
        source={
          avatar
            ? { uri: avatar }
            : require('../../../assets/images/default-user-image.png')
        }
        style={styles.image}
        resizeMode="cover"
      />
    </View>

    <View style={{ marginHorizontal: 30 }}>
      <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 10 }}>
        {mark[score]}
      </Text>
      <Text style={{ fontSize: 14, marginBottom: 10 }}>{comment}</Text>
      <Text style={{ fontSize: 10 }}>{formatDate(createdAt)}</Text>
    </View>
    <View style={styles.delimiter}></View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { width: '100%', marginTop: 10 },
  mainLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30
  },

  image: {
    height: 45,
    width: 45,
    borderRadius: 50,
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: theme.colors.primary
  },
  delimiter: {
    borderTopColor: '#DFD8C8',
    borderTopWidth: 0.5,
    marginTop: 15,
    marginBottom: 15
  }
});
