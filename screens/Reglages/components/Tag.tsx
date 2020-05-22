import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import TagItem from './TagItem';
import { theme } from '../../../constants';

const tagList = [
  'Boulanger',
  'Chauffeur',
  'Epicier',
  'Garagiste',
  'Ménagère',
  'Poissonier',
  'Reparateur'
];
export default ({ tags = ['_'], parentCallback }) => {
  const [selected, setSelected] = useState<string>();
  const [concatedList, setConcatedList] = useState<Array<string>>(tags);

  const onChange = (item) => {
    setConcatedList(item);
    parentCallback(item);
  };

  const onAdd = (item) => {
    onChange([...concatedList, item]);
  };

  const onRemove = (item) => {
    onChange(concatedList.filter((elm) => elm != item));
  };

  let filterList = tagList
    .filter((x) => !concatedList.includes(x))
    .map((item) => {
      return { label: item, value: item };
    });

  useEffect(() => {
    setConcatedList(tags);
  }, [tags]);
  useEffect(() => {
    filterList = tagList
      .filter((x) => !concatedList.includes(x))
      .map((item) => {
        return { label: item, value: item };
      });
  }, [concatedList]);

  return (
    <>
      <View style={styles.tags}>
        {concatedList.map((item, key) => (
          <TouchableOpacity key={key} onPress={() => onRemove(item)}>
            <TagItem tag={item} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.selector}>
        {concatedList.length >= 5 ? (
          <Text>Maximum atteint</Text>
        ) : (
          <RNPickerSelect
            value={selected}
            placeholder={{
              label: 'Ajouter des tags ...',
              value: '',
              color: theme.colors.gray
            }}
            disabled={concatedList.length >= 5}
            onValueChange={(value) => setSelected(value)}
            doneText={'Ajouter'}
            onDonePress={() => (selected ? onAdd(selected) : null)}
            items={filterList}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tags: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20
  },
  selector: { marginLeft: 20 }
});
