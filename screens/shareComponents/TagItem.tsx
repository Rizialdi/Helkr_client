import React, { SFC } from 'react';
import { StyleSheet, View } from 'react-native';

import { useStoreState } from '../../models';
import Block from './Block';
import Text from './Text';

interface Props {
  tag: string | undefined;
  category?;
  date?;
  type?;
  status?;
  enattente?;
  refusée?;
}
const TagItem: SFC<Props> = ({
  tag = '',
  category,
  date,
  type,
  enattente,
  refusée,
  ...props
}) => {
  const { themeColors } = useStoreState(state => state.Preferences);
  const blockStyles = [
    styles.container,
    category && {
      backgroundColor: 'rgba(175, 158, 123, 0.1)'
    },
    date && { backgroundColor: 'rgba(175, 100, 123, 0.1)' },
    type && { backgroundColor: 'rgba(50, 158, 123, 0.1)' }
  ];

  const statusStyles = {
    'en attente': {
      backgroundColor: themeColors.primary
    },
    refusée: { backgroundColor: themeColors.accent },
    acceptée: { backgroundColor: themeColors.secondary },
    complete: { backgroundColor: themeColors.gray }
  };

  return (
    <>
      {props.status ? (
        <Block
          flex={true}
          row
          margin={[5, 25]}
          padding={[5, 5]}
          style={[statusStyles[tag]]}>
          <Text medium bold transform={'capitalize'}>
            {tag}
          </Text>
        </Block>
      ) : (
        <View style={blockStyles}>
          <Text
            style={{
              fontFamily: 'HelveticaNeue',
              fontSize: 15,
              marginRight: 5
            }}>
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
  }
});

export default TagItem;
