import React, { SFC } from 'react';
import { Image, ImageStyle } from 'react-native';
import { theme } from '../../constants';
import { useStoreState } from '../../models/index';

interface Props {
  image?: string | null | undefined;
  style?: ImageStyle;
  moyenne?: number;
}

const giveGradeColor = (number: number) => {
  if (number === 0) return '';
  const mapper = ['', 'blue', 'orange', 'yellow', 'green'];
  return mapper[number];
};

const ImageComponent: SFC<Props> = ({ image, style, moyenne }) => {
  const { themeColors } = useStoreState(state => state.Preferences);

  return (
    <>
      <Image
        source={
          image
            ? { uri: image, cache: 'force-cache' }
            : require('../../assets/images/defaultUserImage.png')
        }
        blurRadius={0.1}
        resizeMode="cover"
        resizeMethod="scale"
        defaultSource={require('../../assets/images/defaultUserImage.png')}
        style={[
          {
            width: '100%',
            height: '100%',
            borderRadius: theme.sizes.radius * 15,
            borderWidth: theme.sizes.border / 1.5,
            borderColor: giveGradeColor(moyenne || 0) || themeColors.background
          },
          style
        ]}
      />
    </>
  );
};

export default ImageComponent;
