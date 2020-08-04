import React, { useState, useEffect, FC } from 'react';
import { Block, Text, Button, TextAreaInput } from '../../sharedComponents';
import {
  useUpdateOfferingMutation,
  MyIncompleteOfferingDocument,
  MyIncompleteOfferingQuery
} from '../../../graphql';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions
} from 'react-native';
import { DataProxy } from 'apollo-cache';
import { useStoreState } from '../../../models';
import { ModalItemInfos } from '../../sharedComponents';

const { height } = Dimensions.get('screen');
interface Props {
  id?: string;
  previousValue?: string;
  closeModal: () => void;
}
const UpdateDescription: FC<Props> = ({ id, previousValue, closeModal }) => {
  const [text, setTextValue] = useState<string>('');
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);
  const [errorModal, setErrorModal] = useState<boolean>(false);

  useEffect(() => {
    setTextValue(previousValue as string);
  }, []);

  const [
    updateOfferingMutation,
    { loading, error }
  ] = useUpdateOfferingMutation();

  const updateCache = (cache: DataProxy) => {
    const data = cache.readQuery({
      query: MyIncompleteOfferingDocument,
      variables: {}
    }) as MyIncompleteOfferingQuery | undefined;

    const newData = {
      ...data,
      myIncompleteOffering: data?.myIncompleteOffering.map(item => {
        if (item.id != id) return item;
        return { ...item, description: text, updatedAt: Date.now() };
      })
    };
    cache.writeQuery({
      query: MyIncompleteOfferingDocument,
      variables: {},
      data: newData
    });
  };

  const updateOffering = () => {
    if (!id) return;
    updateOfferingMutation({
      variables: { id: id as string, description: text },
      update: updateCache
    }).then(({ data }) => {
      if (error) {
        setErrorModal(true);
      }
      if (data?.updateOffering) {
        closeModal();
      }
    });
  };

  return (
    <KeyboardAvoidingView behavior={'position'}>
      <ScrollView
        style={{
          height: height * 0.7
        }}
        alwaysBounceVertical={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Block margin={[20, 20]}>
          <TextAreaInput
            min={20}
            max={300}
            value={previousValue}
            parentCallback={setTextValue}
            placeholder={'Entrez votre nouveau texte'}
          />

          <Button
            disabled={!netWorkStatus}
            secondary={previousValue != text}
            onPress={() => {
              previousValue === text ? null : updateOffering();
            }}>
            {loading ? (
              <ActivityIndicator size={'small'} />
            ) : (
              <Text bold center>
                Mettre à jour
              </Text>
            )}
          </Button>
        </Block>
        {errorModal && (
          <ModalItemInfos
            errorReporting
            information={'Erreur'}
            description={
              "Une erreur s'est produite au moment de la mise à jour de votre description. Veuillez réessayer plus tard."
            }
            timer={1}
            callBack={closeModal}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UpdateDescription;
