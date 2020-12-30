import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { theme } from '../../constants';
import { useStoreState } from '../../models';
import {
  BottomStackParamList,
  StackNavigationInterface
} from '../../navigation/Routes';
import { Block, Layout, Text } from '../sharedComponents';
import { ManageCandidates, ManageOffering } from './components';

const Manage = ({
  route: { params },
  navigation
}: StackNavigationInterface<BottomStackParamList, 'Gerer'>) => {
  const tabs = ['Mes Offres', 'Candidats'];
  const [activeTab, setActiveTab] = useState<string>('');
  const { themeColors } = useStoreState(state => state.Preferences);

  useEffect(() => {
    setActiveTab('Mes Offres');
  }, []);

  useEffect(() => {
    params && params.tab === 'tabOne'
      ? setActiveTab('Mes Offres')
      : params && params.tab === 'tabTwo'
      ? setActiveTab('Candidats')
      : null;
  }, [params]);

  const renderTab = (tab: string): JSX.Element => {
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
          size={theme.sizes.base}
          bold
          gray={!isActive}
          secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Layout title={'Gerer'}>
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
            marginVertical: theme.sizes.hinouting / 2.5,
            marginHorizontal: theme.sizes.inouting / 0.8
          }}>
          {tabs.map(tab => renderTab(tab))}
        </Block>
        <Block flex={false}>
          {activeTab === tabs[0] && <ManageOffering {...{ navigation }} />}
          {activeTab === tabs[1] && <ManageCandidates {...{ navigation }} />}
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

export default Manage;
