import React, { useState, useEffect, FC } from 'react';
import { Block, Text, Button, TextAreaInput } from '../../sharedComponents';
import {
  useUpdateOfferingMutation,
  MyIncompleteOfferingDocument,
  MyIncompleteOfferingQuery
} from '../../../graphql';
import {
  ActivityIndicator,
  View,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { DataProxy } from 'apollo-cache';
import { useStoreState } from '../../../models';
import { ModalItemInfos } from '../../sharedComponents';
import { theme } from '../../../constants';

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
    Keyboard.dismiss();
    if (!id) return;
    updateOfferingMutation({
      variables: { id: id as string, description: text },
      update: updateCache
    }).then(({ data, errors }) => {
      if (error || errors) {
        setErrorModal(true);
      }
      if (data?.updateOffering) {
        closeModal();
      }
    });
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ height: '100%' }}>
          <Block margin={[theme.sizes.htwiceTen, theme.sizes.twiceTen]}>
            <TextAreaInput
              min={20}
              max={300}
              value={previousValue}
              parentCallback={setTextValue}
              placeholder={'Entrez votre nouveau texte'}
            />
          </Block>
          <Block
            margin={[theme.sizes.htwiceTen, theme.sizes.twiceTen]}
            style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 0 }}>
            <TouchableWithoutFeedback
              onPress={() => {
                previousValue === text ? null : updateOffering();
              }}>
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
            </TouchableWithoutFeedback>
          </Block>
        </View>
      </TouchableWithoutFeedback>
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
    </>
  );
};

export default UpdateDescription;
