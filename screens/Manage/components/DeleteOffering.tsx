import React, { useState, FC } from 'react';
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
  closeModal: () => void;
  setOpenGlobalModal?: React.Dispatch<React.SetStateAction<boolean>>;
}
const UpdateDescription: FC<Props> = ({
  id,
  closeModal,
  setOpenGlobalModal
}) => {
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
      label: 'Je souhaite supprimer mon annonce',
      value: 'Je souhaite supprimer mon annonce'
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
        setOpenGlobalModal && setOpenGlobalModal(false);
      } else {
        closeModal();
      }
    });
  };

  return (
    <KeyboardAvoidingView behavior={'position'}>
      <ScrollView
        style={{
          height: height * 0.4
        }}
        alwaysBounceVertical={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Block margin={[20, 20]}>
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
                    obj.value
                      ? themeColors.accent
                      : themeColors.defaultTextColor
                  }
                  onPress={() => {
                    setSelectedConfirmation(true);
                  }}
                  buttonSize={15}
                  buttonOuterSize={20}
                  buttonStyle={{ marginLeft: 10 }}
                  buttonWrapStyle={{
                    marginTop: 20,
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
                    fontSize: 16,
                    color: themeColors.defaultTextColor
                  }}
                  labelWrapStyle={{
                    flex: 0.8,
                    padding: 20,
                    paddingLeft: 0
                  }}
                />
              </RadioButton>
            ))}
          </RadioForm>

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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UpdateDescription;
