import React, { SFC } from 'react';
import Text from './Text';
import { capitalize } from '../../utils';
import { theme } from '../../constants';
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
            <Text
              key={idx}
              regular
              vertical={theme.sizes.inouting * 0.12}
              horizontal={theme.sizes.twiceTen / 2}>
              <Text horizontal={theme.sizes.twiceTen} semibold>
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
