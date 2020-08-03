import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { theme } from '../../../constants';
import { Text } from '../../sharedComponents';
import TagItem from './TagItem';

const tagList = [
  'Boulanger',
  'Chauffeur',
  'Epicier',
  'Garagiste',
  'Ménagère',
  'Réparation',
  'Ménage'
];

interface Props {
  tags?: string[] | null;
  parentCallback: (a: string[]) => void;
}

type labelOrValue = { label: string; value: string };
export default ({ tags = ['_'], parentCallback }: Props) => {
  const [selected, setSelected] = useState<string>();
  const [concatedList, setConcatedList] = useState<Array<string> | null>(tags);

  const onChange = (item: string[]) => {
    setConcatedList(item);
    parentCallback(item);
  };

  const onAdd = (item: string) => {
    concatedList && onChange([...concatedList, item]);
  };

  const onRemove = (item: string) => {
    concatedList && onChange(concatedList.filter(elm => elm != item));
  };

  let filterList: labelOrValue[] = [];
  if (concatedList) {
    filterList = tagList
      .filter(x => !concatedList.includes(x))
      .map(item => {
        return { label: item, value: item };
      });
  }

  useEffect(() => {
    tags && setConcatedList(tags);
  }, [tags]);
  useEffect(() => {
    if (concatedList) {
      filterList = tagList
        .filter(x => !concatedList.includes(x))
        .map(item => {
          return { label: item, value: item };
        });
    }
  }, [concatedList]);

  return (
    <>
      <View style={styles.tags}>
        {concatedList &&
          concatedList?.length > 0 &&
          concatedList?.map((item, key) => (
            <TouchableOpacity key={key} onPress={() => onRemove(item)}>
              <TagItem tag={item} />
            </TouchableOpacity>
          ))}
      </View>
      <View style={styles.selector}>
        {concatedList && concatedList.length >= 5 ? (
          <Text>Maximum atteint</Text>
        ) : (
          <RNPickerSelect
            value={selected}
            placeholder={{
              label: 'Ajouter des tags ...',
              value: '',
              color: theme.colors.gray
            }}
            disabled={!!(concatedList && concatedList.length >= 5)}
            onValueChange={value => setSelected(value)}
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
