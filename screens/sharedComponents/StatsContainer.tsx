import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

import { theme } from '../../constants';
import { useGetUserStatsQuery } from '../../graphql';
import { useStoreState } from '../../models';
import {
  DemandesParamsList,
  DetailOfferingParamsList,
  MainStackParamList
} from '../../navigation/Routes';
import AvgContainer from './AvgContainer';
import Text from './Text';

interface Props {
  id: string;
  offeringAuthorStars?: boolean;
  navigation?:
    | StackNavigationProp<MainStackParamList, 'Profile'>
    | StackNavigationProp<DemandesParamsList, 'LinkedIdProfile'>
    | StackNavigationProp<
        DetailOfferingParamsList,
        'DetailsOnOfferingProposition'
      >;
}

export default ({ id, offeringAuthorStars, navigation }: Props) => {
  const {
    data: {
      getUserStats: { done, proposed, average } = {
        done: 0,
        proposed: 0,
        average: 0
      }
    } = {}
  } = useGetUserStatsQuery({
    variables: { id },
    errorPolicy: 'ignore',
    fetchPolicy: 'cache-and-network'
  });

  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);

  return (
    <>
      <View style={styles.statsContainer}>
        <View style={styles.statsBox}>
          <Text style={[styles.text, { fontSize: theme.sizes.twiceTen * 1.2 }]}>
            {done}
          </Text>
          <Text style={[styles.text, styles.subText]}>Accomplies</Text>
        </View>
        <View
          style={[
            styles.statsBox,
            {
              borderColor: '#DFD8C8',
              borderLeftWidth: 1,
              borderRightWidth: 1
            }
          ]}>
          <Text style={[styles.text, { fontSize: theme.sizes.twiceTen * 1.2 }]}>
            {proposed}
          </Text>
          <Text style={[styles.text, styles.subText]}>Proposées</Text>
        </View>
        <View style={styles.statsBox}>
          <Text
            style={[
              styles.text,
              { fontSize: theme.sizes.twiceTen * 1.2 }
            ]}>{`${average}/5`}</Text>
          <Text style={[styles.text, styles.subText]}>Moyenne</Text>
        </View>
      </View>
      {!offeringAuthorStars && (
        <>
          <View style={styles.delimiter}></View>
          <TouchableOpacity
            style={styles.lineStars}
            disabled={done === 0 || !netWorkStatus}
            onPress={(): void =>
              navigation &&
              //@ts-ignore
              navigation.navigate('Avis', {
                id: id
              })
            }>
            <AvgContainer average={average} done={done} />
            {done > 0 && (
              <AntDesign
                name="right"
                size={theme.sizes.twiceTen * 1.2}
                color="#52575D"
              />
            )}
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: theme.sizes.hinouting * 1.28
  },
  statsBox: {
    alignItems: 'center',
    flex: 1
  },
  subText: {
    fontSize: theme.sizes.caption,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500'
  },
  text: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D'
  },
  lineStars: {
    flexDirection: 'row',
    marginTop: theme.sizes.hinouting,
    justifyContent: 'space-between',
    marginHorizontal: theme.sizes.inouting * 0.64
  },
  delimiter: {
    borderTopColor: '#DFD8C8',
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: theme.sizes.hinouting
  }
});
