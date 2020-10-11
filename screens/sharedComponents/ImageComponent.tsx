import React, { SFC } from 'react';
import { Image, ImageStyle } from 'react-native';

interface Props {
  image?: string | null;
  style?: ImageStyle;
}
const ImageComponent: SFC<Props> = ({ image, style }) => {
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
        style={[{ width: '100%', height: '100%' }, style]}
      />
    </>
  );
};

export default ImageComponent;
