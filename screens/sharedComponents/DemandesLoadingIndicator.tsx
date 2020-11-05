import React from 'react';
import {
  Placeholder,
  PlaceholderLine,
  Fade,
  PlaceholderMedia
} from 'rn-placeholder';
import { theme } from '../../constants';
import { StyleSheet } from 'react-native';

const DemandesLoadingIndicator = (): JSX.Element => {
  const numberOfPlaceHolder = [1, 2, 3, 4];
  return (
    <>
      {numberOfPlaceHolder.map((_, key) => (
        <Placeholder
          key={key}
          Left={PlaceholderMedia}
          Animation={Fade}
          style={{
            paddingLeft: theme.sizes.htwiceTen,
            paddingTop: 10,
            borderBottomWidth: StyleSheet.hairlineWidth
          }}>
          <PlaceholderLine width={70} />
          <PlaceholderLine width={50} />
          <PlaceholderLine width={80} />
          <PlaceholderLine width={30} />
        </Placeholder>
      ))}
    </>
  );
};

export default DemandesLoadingIndicator;
