import React from 'react';
import { StyleSheet } from 'react-native';

import { formatDate, getDayAndDate } from '../../utils';
import Block from './Block';
import TagItem from './TagItem';
import Text from './Text';
import { theme } from '../../constants';

interface Props {
  offering: {
    category: string;
    type: string;
    description: string;
    createdAt: string;
    updatedAt?: string;
    eventday?: string;
    completed?: boolean;
    status?: string | null | undefined;
  };
}
export default ({ offering }: Props) => {
  const {
    category,
    type,
    description,
    createdAt,
    updatedAt,
    eventday
  } = offering;

  return (
    <Block flex={false} style={styles.container}>
      {offering?.status && offering?.status === 'terminée' ? (
        <Block>
          <TagItem tag={offering.status} status />
        </Block>
      ) : offering?.status && eventday ? (
        <Block
          flex={false}
          row
          space={'between'}
          margin={[0, theme.sizes.inouting]}>
          <TagItem tag={'Rendez-vous'} rdv />
          <TagItem
            tag={`${getDayAndDate(offering?.eventday).join(' ')} `}
            date
          />
        </Block>
      ) : offering?.status && offering?.status != 'terminée' ? (
        <TagItem tag={offering?.status} status />
      ) : null}
      <Block flex={false} row middle space={'around'}>
        <TagItem tag={type} type />
        <TagItem tag={category} category />
        <TagItem
          tag={updatedAt ? formatDate(updatedAt) : formatDate(createdAt)}
          date
        />
      </Block>
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: theme.sizes.htwiceTen / 2,
    marginVertical: theme.sizes.twiceTen / 2,
    justifyContent: 'space-between',
    alignContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#000'
  },
  mainLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: theme.sizes.inouting * 1.2
  },
  delimiter: {
    borderTopColor: '#DFD8C8',
    borderTopWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.hinouting * 0.6
  },
  description: {
    marginHorizontal: theme.sizes.inouting * 1.2,
    marginVertical: theme.sizes.hinouting * 0.6
  }
});
