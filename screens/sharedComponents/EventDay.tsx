import React, { SFC } from 'react';
import { Text } from '.';
import { plainDayAndDate } from '../../utils';
import { theme } from '../../constants';

interface Props {
  eventday: string;
}
const EventDay: SFC<Props> = ({ eventday }) => {
  return (
    <>
      <Text
        bold
        size={theme.sizes.twiceTen * 0.8}
        vertical={[theme.sizes.hinouting * 0.8, theme.sizes.inouting * 0.4]}>
        Jour de la prestation
      </Text>
      <Text horizontal={theme.sizes.twiceTen} semibold transform={'capitalize'}>
        {plainDayAndDate(eventday).join(' ')}
      </Text>
    </>
  );
};

export default EventDay;
