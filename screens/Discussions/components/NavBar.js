import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

import { Text } from '../../shareComponents';

export default function NavBarCustom(props) {
  if (Platform.OS === 'web') {
    return null;
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.arrow}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Discussions')}
          >
            <MaterialIcons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.name}>
          <Text>{props.nom}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50
  },
  arrow: {
    flex: 0.2,
    alignItems: 'center'
  },
  name: {
    flex: 0.8,
    alignItems: 'flex-start',
    marginLeft: 20
  }
});
