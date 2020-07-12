import React, { useState, useEffect, FC } from 'react';
import { Block, Text, Button, TextAreaInput } from '../../shareComponents';
import {
  useUpdateOfferingMutation,
  MyIncompleteOfferingDocument,
  MyIncompleteOfferingQuery
} from '../../../graphql';
import { useApolloClient } from '@apollo/react-hooks';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions
} from 'react-native';
import { DataProxy } from 'apollo-cache';

const { height } = Dimensions.get('screen');
interface Props {
  id?: string;
  previousValue?: string;
  closeModal: () => void;
}
const UpdateDescription: FC<Props> = ({ id, previousValue, closeModal }) => {
  const client = useApolloClient();
  const [text, setTextValue] = useState<string>('');

  useEffect(() => {
    setTextValue(previousValue as string);
  }, []);

  const [
    updateOfferingMutation,
    { loading, error }
  ] = useUpdateOfferingMutation();
  const [isDescriptionUpdated, setIsDescriptionUpdated] = useState<boolean>(
    false
  );

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
    }).then(data => {
      if (error) {
        setIsDescriptionUpdated(false);
        closeModal();
        //TODO toast change unsuccessful
      }
      if (data.data?.updateOffering) {
        setIsDescriptionUpdated(true);
        closeModal();
        //TODO toast change successful
      } else {
        setIsDescriptionUpdated(false);
        closeModal();
        //TODO toast change unsuccessful
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UpdateDescription;
