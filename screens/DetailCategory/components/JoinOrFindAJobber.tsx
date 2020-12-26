import React from 'react';
import { Button, Text, ModalItemInfos, Block } from '../../sharedComponents';
import {
  StackNavigationInterface,
  DetailStackParamsList
} from '../../../navigation/Routes';

import {
  useTagsAddJobberMutation,
  UserByIdDocument,
  UserByIdQuery,
  TagsAddJobberMutation
} from '../../../graphql';
import { ActivityIndicator } from 'react-native';
import { getReferenceIdOnCategory } from '../../../utils';
import { DataProxy } from 'apollo-cache';
import { useStoreState, useStoreActions } from '../../../models';
import { ExecutionResult } from 'graphql';

const JoinOrFindAJobber = ({
  navigation,
  route
}: StackNavigationInterface<
  DetailStackParamsList,
  'DetailItem'
>): JSX.Element => {
  const { category, categoryItem } = route.params;
  const referenceId = getReferenceIdOnCategory(category, categoryItem);

  const { user } = useStoreState(state => state.User);
  const { tags } = useStoreState(state => state.Offering);
  const { setTags } = useStoreActions(action => action.Offering);

  const _update = async (cache: DataProxy): Promise<void> => {
    if (tags.length >= 4) return;

    const newTags = [...new Set([...tags, referenceId])];
    setTags(newTags);

    const dataUserInfos = cache.readQuery({
      query: UserByIdDocument,
      variables: { id: user.id }
    }) as UserByIdQuery | undefined;

    if (dataUserInfos && dataUserInfos.userById) {
      const newDataUserInfos = {
        ...dataUserInfos,
        userById: {
          ...dataUserInfos?.userById,
          tags: newTags
        }
      };
      cache.writeQuery({
        query: UserByIdDocument,
        variables: { id: user.id },
        data: newDataUserInfos
      });
    }
  };
  const [addTagMutation, { data, loading, error }] = useTagsAddJobberMutation({
    update: _update
  });

  return (
    <Block padding={[20, 20]} middle white>
      <Text center vertical={[20, 20]}>
        Recherchez-vous un prestataire pour cette catégorie ?
      </Text>

      <Button
        secondary
        onPress={(): void =>
          navigation.navigate('DetailItem', {
            category,
            categoryItem
          })
        }>
        <Text center bold>
          Oui, je recherche un prestataire
        </Text>
      </Button>

      <Button
        secondary
        disabled={loading}
        onPress={(): Promise<ExecutionResult<TagsAddJobberMutation>> =>
          addTagMutation({ variables: { tag: referenceId } })
        }>
        <Text center bold>
          Non, je propose mes services
        </Text>
      </Button>

      {loading && <ActivityIndicator size={'large'} />}
      {error && (
        <ModalItemInfos
          timer={0}
          errorReporting
          information={'Erreur'}
          callBack={navigation.goBack}
          description={
            "Une erreur s'est produite sur le réseau. Veuillez réessayer plus tard."
          }
        />
      )}
      {data?.tagsAddJobber.added && (
        <ModalItemInfos
          timer={0}
          information={'Ajouté'}
          callBack={navigation.goBack}
          description={
            "Ce tag vient d'être ajouté à votre liste de préférences. Vous recevrez désormais des missions en rapport avec ce dernier."
          }
        />
      )}
      {data?.tagsAddJobber.max && (
        <ModalItemInfos
          timer={0}
          errorReporting
          information={'Erreur'}
          callBack={navigation.goBack}
          description={
            'La liste de préférences est limitée à 4 tags. Veuillez mettre à jour vos tags avant de recommencer.'
          }
        />
      )}
    </Block>
  );
};

export default JoinOrFindAJobber;
