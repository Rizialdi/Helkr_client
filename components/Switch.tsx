import React, { FC } from 'react';
import { Switch, Platform } from 'react-native';

import { theme } from '../constants';

interface Props {
  value: boolean | undefined;
}

const SwitchInput: FC<Props> = ({ value, ...props }) => {
  let thumbColor: string = '';

  if (Platform.OS === 'android') {
    thumbColor = theme.colors.gray;
    if (value) thumbColor = theme.colors.secondary;
  }

  return (
    <Switch
      thumbColor={thumbColor}
      ios_backgroundColor={theme.colors.gray}
      trackColor={{
        false: theme.colors.gray,
        true: theme.colors.secondary
      }}
      value={value}
      {...props}
    />
  );
};

export default SwitchInput;
