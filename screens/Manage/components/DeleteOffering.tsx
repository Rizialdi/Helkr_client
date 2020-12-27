import React, { useState, FC } from 'react';
import { ActivityIndicator, View } from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
  //@ts-ignore
} from 'react-native-simple-radio-button';

import { Block, Text, Button } from '../../sharedComponents';
import {
  MyIncompleteOfferingQuery,
  useDeleteOfferingMutation,
  MyIncompleteOfferingDocument,
  GetUserStatsQuery,
  GetUserStatsDocument
} from '../../../graphql';
import { useStoreState } from '../../../models';
import { DataProxy } from 'apollo-cache';
import { theme } from '../../../constants';

interface Props {
  id?: string;
  closeModal: () => void;
  navigationBack: () => void;
}
const UpdateDescription: FC<Props> = ({ id, closeModal, navigationBack }) => {
  const [selectedConfirmation, setSelectedConfirmation] = useState<boolean>(
    false
  );

  const { themeColors } = useStoreState(state => state.Preferences);
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);
  const { user } = useStoreState(state => state.User);

  const [
    deleteOfferingMutation,
    { loading, error }
  ] = useDeleteOfferingMutation();
  const objValue = [
    {
      label: 'Je souhaite supprimer ma mission.',
      value: 'Je souhaite supprimer ma mission.'
    }
  ];

  const updateCache = (cache: DataProxy) => {
    const dataMyIncompleteOffering = cache.readQuery({
      query: MyIncompleteOfferingDocument,
      variables: {}
    }) as MyIncompleteOfferingQuery | undefined;

    // Update my icncomplete offerings list
    const newData = {
      ...dataMyIncompleteOffering,
      myIncompleteOffering: dataMyIncompleteOffering?.myIncompleteOffering.filter(
        item => item.id !== id
      )
    };

    cache.writeQuery({
      query: MyIncompleteOfferingDocument,
      variables: {},
      data: newData
    });

    // Update User stats as well
    const dataUserStats = cache.readQuery({
      query: GetUserStatsDocument,
      variables: { id: user.id }
    }) as GetUserStatsQuery | undefined;

    if (dataUserStats && dataUserStats.getUserStats) {
      const newDataUserStats = {
        ...dataUserStats,
        getUserStats: {
          ...dataUserStats?.getUserStats,
          proposed:
            dataUserStats?.getUserStats.proposed > 0
              ? dataUserStats?.getUserStats.proposed - 1
              : 0
        }
      };

      cache.writeQuery({
        query: GetUserStatsDocument,
        variables: { id: user.id },
        data: newDataUserStats
      });
    }
  };

  const removeOffering = () => {
    if (!id) return;
    deleteOfferingMutation({
      variables: { id: id as string },
      update: updateCache
    }).then(data => {
      if (error) {
        closeModal();
      }
      if (data.data?.deleteOffering) {
        closeModal();
        navigationBack();
      } else {
        closeModal();
      }
    });
  };

  return (
    <View
      style={{
        height: '100%'
      }}>
      <Block margin={[theme.sizes.hinouting * 0.8, theme.sizes.inouting * 0.8]}>
        <Text bold center>
          Nous sommes désolé de l'apprendre
        </Text>
        <RadioForm animation={true}>
          {objValue.map((obj, i) => (
            <RadioButton labelHorizontal={true} key={i}>
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={selectedConfirmation}
                borderWidth={1}
                buttonInnerColor={themeColors.accent}
                buttonOuterColor={
                  obj.value ? themeColors.accent : themeColors.defaultTextColor
                }
                onPress={() => {
                  setSelectedConfirmation(true);
                }}
                buttonSize={theme.sizes.twiceTen * 0.75}
                buttonOuterSize={theme.sizes.twiceTen}
                buttonStyle={{ marginLeft: theme.sizes.twiceTen / 2 }}
                buttonWrapStyle={{
                  marginTop: theme.sizes.htwiceTen,
                  flex: 0.2
                }}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={true}
                onPress={() => {
                  setSelectedConfirmation(true);
                }}
                labelStyle={{
                  fontSize: theme.sizes.header,
                  color: themeColors.defaultTextColor
                }}
                labelWrapStyle={{
                  flex: 0.8,
                  paddingHorizontal: theme.sizes.hinouting * 0.8,
                  paddingVertical: theme.sizes.inouting * 0.8,
                  paddingLeft: 0
                }}
              />
            </RadioButton>
          ))}
        </RadioForm>
      </Block>
      <Block
        margin={[0, theme.sizes.twiceTen]}
        style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 0 }}>
        <Button
          accent={selectedConfirmation}
          disabled={!netWorkStatus}
          onPress={() => {
            selectedConfirmation ? removeOffering() : null;
          }}>
          {loading ? (
            <ActivityIndicator size={'small'} />
          ) : (
            <Text bold center>
              Supprimer
            </Text>
          )}
        </Button>
      </Block>
    </View>
  );
};

export default UpdateDescription;
