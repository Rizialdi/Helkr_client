import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <Svg height={75} viewBox="5 12 90 70" width={75} fill="none" {...props}>
      <Path
        opacity={0.6}
        d="M72.87 32.16H25.63a.43.43 0 00-.43.43v31.03c0 .238.192.43.43.43h47.24a.43.43 0 00.43-.43V32.59a.43.43 0 00-.43-.43z"
        fill="#2BDA8E"
      />
      <Path
        d="M76.96 42.42H63.73c-.85 0-1.54.69-1.54 1.54v25.52c0 .85.69 1.54 1.54 1.54h13.23c.85 0 1.54-.69 1.54-1.54V43.96c0-.85-.69-1.54-1.54-1.54z"
        fill="#F6F6F6"
      />
      <Path
        opacity={0.6}
        d="M76.58 44.64H66.31a1.91 1.91 0 00-1.91 1.91v22.56a1.91 1.91 0 001.91 1.91h10.27a1.91 1.91 0 001.91-1.91V46.55a1.91 1.91 0 00-1.91-1.91z"
        fill="#0094FF"
      />
      <Path
        d="M76.54 41.8h-2.62v-11a2.45 2.45 0 00-2.44-2.45H23.33a2.45 2.45 0 00-2.44 2.45v31.4a2.45 2.45 0 002.44 2.45h18v5.75h-4.51v1.24H58V70.4h-4.48v-5.74h8v4.4a2.59 2.59 0 002.58 2.58h12.44a2.58 2.58 0 002.57-2.58V44.38a2.58 2.58 0 00-2.57-2.58zM52.29 70.4h-9.78v-5.74h9.78v5.74zm.61-7H23.33a1.21 1.21 0 01-1.21-1.21v-4.85h37.72V56.1H22.12V30.81a1.21 1.21 0 011.21-1.21h48.15a1.21 1.21 0 011.21 1.21v11h-8.54a2.59 2.59 0 00-2.58 2.58v19l-8.67.01zm9.9 0V47.13h11.69V45.9H62.8v-1.52A1.36 1.36 0 0164.15 43h12.39a1.36 1.36 0 011.34 1.35v22.54H62.8V63.4zm13.74 7H64.15a1.35 1.35 0 01-1.35-1.34v-.93h15.08v.93a1.35 1.35 0 01-1.34 1.34z"
        fill="#333"
      />
      <Path
        d="M45.54 44.23l2.09-2.48a.44.44 0 01.35-.17.439.439 0 01.36.17l4.41 5.32 1-.79L49.29 41a1.58 1.58 0 00-1.29-.66 1.71 1.71 0 00-1.3.61l-1.9 2.26-2.32-3.12a1.68 1.68 0 00-2.8.12L34.26 49a.62.62 0 00.233.852.65.65 0 00.317.088H58v-1.27h-9.15l-3.31-4.44zm-9.65 4.44l4.82-7.81a.44.44 0 01.76 0l5.84 7.84-11.42-.03zM54.89 43.22a2.62 2.62 0 10.04-5.24 2.62 2.62 0 00-.04 5.24zm0-4a1.38 1.38 0 11-1.37 1.38 1.38 1.38 0 011.37-1.37v-.01z"
        fill="#333"
      />
    </Svg>
  );
};

export default SvgComponent;
