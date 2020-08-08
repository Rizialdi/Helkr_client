import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import AvgContainer from './AvgContainer';
import { MainStackParamList } from '../../navigation/Routes';
import { StackNavigationProp } from '@react-navigation/stack';

import Text from './Text';
import { useGetUserStatsQuery } from '../../graphql';

import { useStoreState } from '../../models';

interface Props {
  id: string;
  offeringAuthorStars?: boolean;
  navigation?: StackNavigationProp<MainStackParamList, 'Profile'>;
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
          <Text style={[styles.text, { fontSize: 24 }]}>{done}</Text>
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
          <Text style={[styles.text, { fontSize: 24 }]}>{proposed}</Text>
          <Text style={[styles.text, styles.subText]}>Proposées</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={[styles.text, { fontSize: 24 }]}>{`${average}/5`}</Text>
          <Text style={[styles.text, styles.subText]}>Moyenne</Text>
        </View>
      </View>
      {!offeringAuthorStars && (
        <>
          <View style={styles.delimiter}></View>
          <TouchableOpacity
            style={styles.lineStars}
            disabled={done === 0 || !netWorkStatus}
            onPress={() =>
              navigation &&
              navigation.navigate('Avis', {
                id: id
              })
            }>
            <AvgContainer average={average} done={done} />
            {done > 0 && <Icon name="right" size={24} color="#52575D" />}
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
    marginTop: 32
  },
  statsBox: {
    alignItems: 'center',
    flex: 1
  },
  subText: {
    fontSize: 12,
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
    marginTop: 25,
    justifyContent: 'space-between',
    marginHorizontal: 16
  },
  delimiter: {
    borderTopColor: '#DFD8C8',
    borderTopWidth: 0.5,
    marginTop: 25
  }
});
