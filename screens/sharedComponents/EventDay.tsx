import React, { FC } from 'react';
import { Text } from '.';
import { plainDayAndDate } from '../../utils';

interface Props {
  eventday: string;
}
const EventDay: FC<Props> = ({ eventday }) => {
  return (
    <>
      <Text bold size={16} vertical={[20, 10]}>
        Jour de la prestation
      </Text>
      <Text horizontal={20} semibold transform={'capitalize'}>
        {plainDayAndDate(eventday).join(' ')}
      </Text>
    </>
  );
};

export default EventDay;
