import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import { theme } from "../../../constants";
import { Text } from "../../shareComponents";
import TagItem from "./TagItem";

const tagList = [
  "Boulanger",
  "Chauffeur",
  "Epicier",
  "Garagiste",
  "Ménagère",
  "Réparation",
  "Ménage",
];

interface Props {
  tags?: string[];
  parentCallback: (a: string[]) => void;
}

export default ({ tags = ["_"], parentCallback }: Props) => {
  const [selected, setSelected] = useState<string>();
  const [concatedList, setConcatedList] = useState<Array<string>>(tags);

  const onChange = (item: string[]) => {
    setConcatedList(item);
    parentCallback(item);
  };

  const onAdd = (item: string) => {
    onChange([...concatedList, item]);
  };

  const onRemove = (item: string) => {
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
              label: "Ajouter des tags ...",
              value: "",
              color: theme.colors.gray,
            }}
            disabled={concatedList.length >= 5}
            onValueChange={(value) => setSelected(value)}
            doneText={"Ajouter"}
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
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 20,
  },
  selector: { marginLeft: 20 },
});
