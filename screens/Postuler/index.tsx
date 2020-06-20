import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useStoreState } from '../../models';
import { Block, Layout, Text } from '../shareComponents';
import { Offres, Postulees } from './components';

//TODO implement infinite scroll when Issue resolved
// cf https://gist.github.com/ctrlplusb/17b5a1bd1736b5ba547bb15b3dd5be29

const Postuler = () => {
  const tabs = ['Offres', 'Postulées'];
  const [activeTab, setActiveTab] = useState<string>('');
  const { themeColors } = useStoreState(state => state.Preferences);

  useEffect(() => {
    setActiveTab('Offres');
  }, []);

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
                borderBottomWidth: 2
              }
            : null
        ]}>
        <Text size={16} medium gray={!isActive} secondary={isActive}>
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
            marginVertical: 10,
            marginHorizontal: 20
          }}>
          {tabs.map(tab => renderTab(tab))}
        </Block>
        <Block flex={false}>
          {activeTab === tabs[0] && <Offres />}
          {activeTab === tabs[1] && <Postulees />}
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
    marginRight: 14,
    paddingBottom: 10
  }
});

export default Postuler;
