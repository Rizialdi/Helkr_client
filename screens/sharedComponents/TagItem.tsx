import React, { SFC } from 'react';
import { StyleSheet, View } from 'react-native';

import { useStoreState } from '../../models';
import Text from './Text';
import { theme } from '../../constants';

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
      backgroundColor: themeColors.gray2
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
          <Text style={styles.text} bold={rdv}>
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
    paddingHorizontal: theme.sizes.twiceTen / 4,
    paddingVertical: theme.sizes.htwiceTen / 4,
    borderRadius: theme.sizes.border,
    marginHorizontal: theme.sizes.inouting / 5,
    marginVertical: theme.sizes.hinouting / 5
  },
  containerStatus: {
    marginHorizontal: theme.sizes.inouting,
    marginBottom: theme.sizes.hinouting / 10,
    alignSelf: 'flex-start'
  },
  text: {
    fontFamily: 'HelveticaNeue',
    fontSize: theme.sizes.header,
    marginRight: theme.sizes.inouting / 5
  }
});

export default TagItem;
