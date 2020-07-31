import React, { useState, SFC } from 'react';
import { View, StyleSheet, FlatList, Dimensions, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, Layout } from '../sharedComponents';
import { MultiStepMenu, RadioForm } from './components/';

interface Props {
  route?: any;
  navigation?: any;
}

const { width } = Dimensions.get('screen');

const Item = ({ title }: { title: string }) => {
  return (
    <View style={styles.item}>
      <Text body semibold transform={'capitalize'}>
        {title}
      </Text>
    </View>
  );
};

const DetailCategory: SFC<Props> = ({ route }) => {
  const { category } = route.params;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [categoryItem, setCategoryItem] = useState<string>('');
  return (
    <Layout>
      <SafeAreaView>
        <FlatList
          data={Object.keys(category.tag)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setOpenModal(true);
                setCategoryItem(item);
              }}>
              <Item title={item} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
        />

        <Modal
          animationType="slide"
          hardwareAccelerated={true}
          presentationStyle="overFullScreen"
          visible={openModal}>
          {categoryItem && (
            <MultiStepMenu
              categoryName={category.name}
              categoryItem={categoryItem}
              categoryItemReferenceId={category.tag[categoryItem].referenceId}>
              {categoryItem &&
                Object.keys(category.tag[categoryItem].detailQuestions).map(
                  (item, idx) => (
                    <MultiStepMenu.Item key={idx} openModal={setOpenModal}>
                      <RadioForm
                        name={item}
                        radio_props={
                          category.tag[categoryItem].detailQuestions[item]
                        }
                      />
                    </MultiStepMenu.Item>
                  )
                )}
            </MultiStepMenu>
          )}
        </Modal>
      </SafeAreaView>
    </Layout>
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
