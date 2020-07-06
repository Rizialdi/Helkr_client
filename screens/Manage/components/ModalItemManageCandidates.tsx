import React, { useState, FC } from 'react';
import { ActivityIndicator, StyleSheet, Dimensions, View } from 'react-native';
import Modal from 'react-native-modal';

import {
  Text,
  Layout,
  Block,
  TagItem,
  CandidateCard
} from '../../shareComponents';
import { useOfferingByIdQuery } from '../../../graphql';
import { formatDateAvis } from '../../../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Avis from '../../Avis';
const { height, width } = Dimensions.get('screen');

interface Props {
  id?: string;
}

const ModalItemManageCandidates: FC<Props> = props => {
  const [selectedId, setSelectedId] = useState<string>('');
  const { called, loading, data } = useOfferingByIdQuery({
    variables: { id: props.id as string }
  });

  return (
    <Layout title={'Details'}>
      {loading && !called ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <Block flex={false} margin={[0, 25]}>
          <Block margin={[0, -25]} flex={false} row middle space={'around'}>
            <TagItem tag={data?.offeringById?.type} type />
            <TagItem tag={data?.offeringById?.category} category />
            <TagItem tag={formatDateAvis(data?.offeringById?.createdAt)} date />
          </Block>
          <Text style={{ marginVertical: 15 }}>
            {data?.offeringById?.description}
          </Text>
          <Text style={{ marginVertical: 15 }}>
            {JSON.stringify(data?.offeringById?.details)}
          </Text>
          <Block flex={false}>
            <Text bold size={16}>
              Candidats
            </Text>
            {data?.offeringById.candidates.length &&
              data.offeringById.candidates.map(item => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setSelectedId(item.id)}>
                  <CandidateCard
                    avatar={item.avatar as string}
                    average={item.moyenne}
                    professional={item.professional}
                  />
                </TouchableOpacity>
              ))}
          </Block>

          <Modal
            isVisible={!!selectedId}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            useNativeDriver
            style={styles.modalContainer}
            backdropColor={'#C1BEC0'}
            onBackButtonPress={() => setSelectedId('')}
            onBackdropPress={() => setSelectedId('')}
            onSwipeComplete={() => setSelectedId('')}>
            <View style={styles.modal}>
              <Avis candidateModalId={selectedId} />
            </View>
          </Modal>
        </Block>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    paddingTop: 20,
    justifyContent: 'flex-end'
  },
  modal: {
    flexDirection: 'column',
    height: height * 0.75,
    padding: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  }
});
export default ModalItemManageCandidates;
