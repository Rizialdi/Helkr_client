import React, { FC } from 'react';
import { Layout, Block, Text } from '../sharedComponents';
import { FlatList } from 'react-native';
import { makePseudoName } from '../../utils';
import { theme } from '../../constants';
import Item from './components/Item';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EmptyQueryBox } from '../../assets/icons';
import {
  StackNavigationInterface,
  DemandesParamsList
} from '../../navigation/Routes';

const Demandes = ({
  navigation
}: StackNavigationInterface<DemandesParamsList, 'Demandes'>) => {
  const data = [
    {
      name: 'Stat',
      surname: 'Remi',
      messageText: 'Statis',
      messageDate: '2020-09-20'
    },
    {
      name: 'Di',
      surname: 'bnoi',
      messageText: 'Statis',
      messageDate: '2020-10-20'
    }
  ];
  return (
    <Layout title={'Demandes'}>
      <Block flex={false}>
        {data ? (
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('QueryDetails', { id: '1' })
                  }>
                  <Item
                    name={makePseudoName(item.name, item.surname)}
                    messageText={item?.messageText}
                    messageDate={item.messageDate}
                    image={
                      'https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2FFAC.2Fvar.2Ffemmeactuelle.2Fstorage.2Fimages.2Famour.2Fcoaching-amoureux.2Fcest-quoi-belle-femme-temoignages-43206.2F14682626-1-fre-FR.2Fc-est-quoi-une-belle-femme-temoignages.2Ejpg/1200x900/quality/80/crop-from/center/c-est-quoi-une-belle-femme-temoignages.jpeg'
                    }
                  />
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.name}
          />
        ) : (
          <Block flex={false}>
            <Text
              horizontal={theme.sizes.twiceTen * 1.75}
              vertical={[theme.sizes.htwiceTen, theme.sizes.htwiceTen]}
              numberOfLines={1}>
              Vous n'avez aucune demande actuellement.
            </Text>
            <Block center padding={[theme.sizes.screenHeight / 7, 0]}>
              <EmptyQueryBox />
            </Block>
          </Block>
        )}
      </Block>
    </Layout>
  );
};

export default Demandes;
