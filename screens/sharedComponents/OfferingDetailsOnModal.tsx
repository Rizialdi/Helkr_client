import React, { SFC } from 'react';
import {} from 'react-native';
import Text from './Text';
import { capitalize } from '../../utils';
interface Props {
  details: { details: string };
}

const OfferingDetailsOnModal: SFC<Props> = ({ details }) => {
  const itemsNotToDisplay: string[] = ['offeringDescription'];
  return (
    <>
      {!!(details && details.details) &&
        Object.entries(
          JSON.parse(details?.details) as { [key: string]: string }
        ).map(([key, value], idx) => {
          if (itemsNotToDisplay.includes(key)) {
            return;
          }
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
