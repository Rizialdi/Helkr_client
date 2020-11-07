import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';
import { useDeleteDemandeMutation } from '../../../graphql';
import { Text, ImageComponent } from '../../sharedComponents';
import { formatDate } from '../../../utils';
import { theme } from '../../../constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { DataProxy } from 'apollo-cache';
import {
  DemandesrecuesDocument,
  DemandesrecuesQuery
} from '../../../graphql/helpkr-types';
import {
  DemandesParamsList,
  queryDetailsItem
} from '../../../navigation/Routes';

interface ItemProps {
  name: string;
  messageText?: string;
  address?: string;
  queryDetail?: boolean;
  messageDate: string;
  image: string | null | undefined;
  navigation?: StackNavigationProp<DemandesParamsList, 'Demandes'>;
  item?: queryDetailsItem;
}
const Item = ({
  name,
  messageText,
  messageDate,
  image,
  queryDetail,
  address,
  navigation,
  item
}: ItemProps) => {
  const _update = async (cache: DataProxy): Promise<void> => {
    const cachedDemandes = cache.readQuery({
      query: DemandesrecuesDocument
    }) as DemandesrecuesQuery | undefined;
    if (cachedDemandes?.demandesrecues.length) {
      const newCachedDemandes = cachedDemandes.demandesrecues.filter(
        cachedItem => {
          return cachedItem.id !== item?.id;
        }
      );

      cache.writeQuery({
        query: DemandesrecuesDocument,
        data: { ...cachedDemandes, demandesrecues: newCachedDemandes }
      });
    }
  };

  const [deleteDemande] = useDeleteDemandeMutation({
    update: _update,
    variables: { id: item?.id || '' },
    optimisticResponse: { deleteDemande: true, __typename: 'Mutation' }
  });

  return (
    <View style={[styles.item, queryDetail && { borderBottomColor: '#fff' }]}>
      <View style={{ flex: 0.22 }}>
        <TouchableOpacity
          style={{
            width: theme.sizes.twiceTen * 3.6,
            height: theme.sizes.htwiceTen * 3.6,
            borderRadius: theme.sizes.radius * 6,
            overflow: 'hidden',
            margin: 'auto'
          }}>
          <ImageComponent image={image} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.secondBlock}
        onPress={() =>
          item &&
          navigation &&
          navigation?.navigate('QueryDetails', { item: item })
        }>
        <View>
          <Text h2>{name}</Text>
        </View>
        <View>
          {!queryDetail ? (
            <Text medium gray2={false} numberOfLines={1}>
              {messageText}
            </Text>
          ) : (
            <Text medium gray2={false}>
              {address}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <View
        style={{
          flex: 0.12,
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <View style={styles.thirdBlock}>
          <Text center caption>
            {formatDate(messageDate)}
          </Text>
          {!queryDetail && (
            <Menu
              //onSelect= {value => console.log(value)}
              onSelect={deleteDemande}
              rendererProps={{
                backgroundColor: 'blue',
                paddingVertical: 10
              }}>
              <MenuTrigger>
                <AntDesign
                  name="ellipsis1"
                  size={theme.sizes.hbase}
                  color="black"
                />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption value="delete" text="Supprimer" />
              </MenuOptions>
            </Menu>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.sizes.inouting * 0.6,
    paddingVertical: theme.sizes.hinouting * 0.6,
    marginVertical: 0,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: theme.sizes.screenWidth,
    height: theme.sizes.htwiceTen * 5
  },
  secondBlock: {
    flex: 0.66,
    paddingRight: theme.sizes.inouting / 5,
    justifyContent: 'space-between',
    alignItems: 'baseline',
    textAlignVertical: 'bottom',
    height: theme.sizes.htwiceTen * 3.5,
    paddingVertical: theme.sizes.hinouting * 0.3
  },
  thirdBlock: {
    justifyContent: 'space-between',
    textAlignVertical: 'bottom',
    height: theme.sizes.htwiceTen * 3.5,
    paddingVertical: theme.sizes.hinouting * 0.3,
    alignItems: 'center'
  }
});

export default Item;
