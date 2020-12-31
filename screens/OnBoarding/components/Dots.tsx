import React from 'react';
import { View } from 'react-native';

import { theme } from '../../../constants';
import { useStoreState } from '../../../models';

interface DotProps {
  isActive: boolean;
}

const Dot = ({ isActive }: DotProps) => {
  const { themeColors } = useStoreState(state => state.Preferences);

  return (
    <View
      style={[
        {
          backgroundColor: themeColors.secondary,
          width: theme.sizes.base / 2,
          height: theme.sizes.hbase / 2,
          borderRadius: theme.sizes.border * 2,
          marginLeft: theme.sizes.base / 2,
          borderWidth: theme.sizes.border,
          borderColor: 'transparent'
        },
        !isActive && {
          transform: [{ scale: 0.5 }]
        },
        { opacity: isActive ? 1 : 0.2 }
      ]}
    />
  );
};

export default Dot;
