import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useStoreState } from '../../models';
import { Block, Layout, Text } from '../sharedComponents';
import { Offres, Postulees } from './components';
import {
  BottomStackParamList,
  StackNavigationInterface
} from '../../navigation/Routes';
import { theme } from '../../constants';

//TODO implement infinite scroll when Issue resolved
// cf https://gist.github.com/ctrlplusb/17b5a1bd1736b5ba547bb15b3dd5be29

const Postuler = ({
  navigation,
  route: { params }
}: StackNavigationInterface<BottomStackParamList, 'Postuler'>) => {
  const tabs = ['Offres', 'Postulées'];
  const [activeTab, setActiveTab] = useState<string>('');
  const { themeColors } = useStoreState(state => state.Preferences);

  useEffect(() => {
    setActiveTab('Offres');
  }, []);

  useEffect(() => {
    params && params.tab === 'tabOne'
      ? setActiveTab('Offres')
      : params && params.tab === 'tabTwo'
      ? setActiveTab('Postulées')
      : null;
  }, [params]);

  const renderTab = (tab: string) => {
    const isActive = activeTab == tab;
    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => setActiveTab(tab)}
        style={[
          styles.tab,
          isActive
            ? {
                borderBottomColor: themeColors.secondary,
                borderBottomWidth: theme.sizes.border / 2
              }
            : null
        ]}>
        <Text
          size={theme.sizes.header}
          bold
          gray={!isActive}
          secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Layout title={'Naviguer'}>
      <>
        <Block
          flex={false}
          row
          middle
          shadow
          animated
          space={'around'}
          style={{
            borderBottomColor: themeColors.gray2,
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginVertical: theme.sizes.hinouting * 0.4,
            marginHorizontal: theme.sizes.inouting * 0.8
          }}>
          {tabs.map(tab => renderTab(tab))}
        </Block>
        <Block flex={false}>
          {activeTab === tabs[0] && <Offres {...{ navigation }} />}
          {activeTab === tabs[1] && <Postulees {...{ navigation }} />}
        </Block>
      </>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  tab: {
    marginRight: theme.sizes.inouting * 0.56,
    paddingBottom: theme.sizes.hinouting * 0.4
  }
});

export default Postuler;
