import React, { useState, SFC } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
  Modal,
  Button
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Text } from '../shareComponents';
import { MultiStepMenu, RadioForm } from './components/';

interface Props {
  route?: any;
  navigation?: any;
}

const { width } = Dimensions.get('screen');

const Item = ({ title }) => {
  return (
    <View style={styles.item}>
      <Text body semibold transform={'capitalize'}>
        {title}
      </Text>
    </View>
  );
};

const radio_props = [
  { label: 'param1', value: 0 },
  { label: 'param2', value: 1 }
];

const Dummy = {
  foyer: [
    { label: 'foyer1', value: 'foyer 1' },
    { label: 'foyer2', value: 'foyer2' }
  ],
  assiette: [
    { label: 'assiette1', value: 'assiette1' },
    { label: 'assiette2', value: 'assiette2' }
  ],
  tomate: [
    { label: 'tomate1', value: 'tomate1' },
    { label: 'tomate2', value: 'tomate2' }
  ],
  marmite: [
    { label: 'bool', value: 'bool' },
    { label: 'bool', value: 'bbol' }
  ]
};

const DetailCategory: SFC<Props> = ({ route, navigation }) => {
  const { category } = route.params;
  const [openModal, setOpenModal] = useState<boolean>(false);

  const close = () => {
    setOpenModal(false);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={category.tag}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setOpenModal(true)}>
              <Item title={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
        <Modal
          animationType="slide"
          hardwareAccelerated={true}
          presentationStyle="overFullScreen"
          visible={openModal}
        >
          <Text center> Ajouter une offre </Text>
          <MultiStepMenu>
            {Object.keys(Dummy).map((item, idx) => (
              <MultiStepMenu.Item key={idx}>
                <RadioForm name={item} radio_props={Dummy[item]} />
              </MultiStepMenu.Item>
            ))}
          </MultiStepMenu>
          <Button title="Apui moi" onPress={() => setOpenModal(false)} />
        </Modal>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 10
  },
  item: {
    padding: 20,
    marginVertical: 0,
    marginHorizontal: 16,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 0.5,
    width: width
  },
  title: {
    fontFamily: 'josefinRegular',
    fontSize: 20
  }
});

export default DetailCategory;
