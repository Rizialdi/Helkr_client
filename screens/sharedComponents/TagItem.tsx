import React, { SFC } from 'react';
import { StyleSheet, View } from 'react-native';

import { useStoreState } from '../../models';
import Text from './Text';

interface Props {
  tag: string | undefined;
  category?: boolean;
  date?: boolean;
  type?: boolean;
  status?: boolean;
  enattente?: boolean;
  refusée?: boolean;
  rdv?: boolean;
}
const TagItem: SFC<Props> = ({
  tag = '',
  category,
  date,
  type,
  enattente,
  refusée,
  rdv,
  ...props
}) => {
  const { themeColors } = useStoreState(state => state.Preferences);
  const blockStyles = [
    styles.container,
    category && {
      backgroundColor: 'rgba(175, 158, 123, 0.1)'
    },
    date && { backgroundColor: 'rgba(175, 100, 123, 0.1)' },
    type && { backgroundColor: 'rgba(50, 158, 123, 0.1)' },
    rdv && { backgroundColor: themeColors.secondary }
  ];

  const statusStyles: { [key: string]: { [key: string]: string } } = {
    'en attente': {
      backgroundColor: themeColors.primary
    },
    refusée: { backgroundColor: themeColors.accent },
    acceptée: { backgroundColor: themeColors.secondary },
    terminée: { backgroundColor: themeColors.gray },
    validée: { backgroundColor: themeColors.primary }
  };

  return (
    <>
      {props.status ? (
        <View
          style={[styles.container, styles.containerStatus, statusStyles[tag]]}>
          <Text bold transform={'capitalize'}>
            {tag}
          </Text>
        </View>
      ) : (
        <View style={[blockStyles]}>
          <Text
            style={{
              fontFamily: 'HelveticaNeue',
              fontSize: 15,
              marginRight: 5
            }}
            bold={rdv}>
            {tag}
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    margin: 5
  },
  containerStatus: {
    marginHorizontal: 25,
    marginBottom: 5,
    alignSelf: 'flex-start'
  }
});

export default TagItem;
