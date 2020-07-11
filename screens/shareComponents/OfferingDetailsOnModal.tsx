import React, { FC, useState } from 'react';
import {} from 'react-native';
import Text from './Text';
import { capitalize } from '../../utils';
interface Props {
  details: { details: object };
}

const OfferingDetailsOnModal: FC<Props> = ({ details }) => {
  const itemsNotToDisplay: string[] = ['offeringDescription'];
  return (
    <>
      {Object.entries(details.details).map(([key, value], idx) => {
        if (itemsNotToDisplay.includes(key)) {
          return;
        }
        console.log(key);
        return (
          <Text key={idx} regular vertical={3} horizontal={10}>
            <Text horizontal={20} semibold>
              {'∴ '}
              {capitalize(key)}
            </Text>
            {' : '} {value}
          </Text>
        );
      })}
    </>
  );
};

export default OfferingDetailsOnModal;
