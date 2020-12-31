import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { theme } from '../../../constants';
import { getItemNameOnReferenceId } from '../../../constants/mocks';
import { Text } from '../../sharedComponents';
import TagItem from './TagItem';

interface Props {
  tags?: string[] | null;
  parentCallback: (a: string[]) => void;
}

export default ({ tags = ['_'], parentCallback }: Props): JSX.Element => {
  const [concatedList, setConcatedList] = useState<string[] | null>(tags);

  const onChange = (item: string[]): void => {
    setConcatedList(item);
    parentCallback(item);
  };

  const onRemove = (item: string): void => {
    concatedList && onChange(concatedList.filter(elm => elm !== item));
  };

  useEffect(() => {
    tags && setConcatedList(tags);
  }, [tags]);

  return (
    <>
      <View style={styles.tags}>
        {concatedList &&
          concatedList?.length > 0 &&
          concatedList?.map((item, key) => (
            <TouchableOpacity key={key} onPress={(): void => onRemove(item)}>
              <TagItem tag={getItemNameOnReferenceId(item)} />
            </TouchableOpacity>
          ))}
      </View>
      <View style={styles.selector}>
        {concatedList && concatedList.length > 3 && (
          <Text>Maximum de tags atteint.</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tags: {
    marginTop: theme.sizes.hinouting * 0.4,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: theme.sizes.inouting * 0.8
  },
  selector: { marginLeft: 20 }
});
