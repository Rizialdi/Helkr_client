import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    //@ts-ignore
    <Svg width={125} height={125} viewBox="0 0 68 68" fill="none" {...props}>
      <G clipPath="url(#prefix__clip1)" fill="#000">
        <Path d="M47.242 24.695a1.97 1.97 0 00-1.968 1.968 1.97 1.97 0 001.968 1.969 1.97 1.97 0 001.969-1.969 1.97 1.97 0 00-1.969-1.968zm0 2.952a.985.985 0 010-1.968.985.985 0 010 1.968zM21.653 40.934a1.97 1.97 0 00-1.969 1.969 1.97 1.97 0 001.969 1.968 1.97 1.97 0 001.968-1.968 1.97 1.97 0 00-1.968-1.969zm0 2.953a.985.985 0 010-1.969.985.985 0 010 1.969z" />
        <Path d="M46.288 25.317l-4.245-2.05a.491.491 0 10-.428.887l4.245 2.05a.488.488 0 00.657-.23.492.492 0 00-.229-.657zM41.829 44.379a1.97 1.97 0 00-1.968 1.968 1.97 1.97 0 001.968 1.969 1.97 1.97 0 001.968-1.969 1.97 1.97 0 00-1.968-1.968zm0 2.953a.985.985 0 010-1.969.985.985 0 010 1.969z" />
        <Path d="M40.875 45.001l-4.246-2.05a.491.491 0 10-.427.887l4.245 2.05a.491.491 0 10.428-.886zM34.447 32.076a1.97 1.97 0 00-1.968 1.969 1.97 1.97 0 001.968 1.968 1.97 1.97 0 001.969-1.968 1.97 1.97 0 00-1.969-1.969zm0 2.953a.985.985 0 010-1.969.985.985 0 010 1.969z" />
        <Path d="M33.582 32.754l-3.26-2.542a.493.493 0 00-.606.776l3.261 2.542a.491.491 0 10.605-.776zM43.305 31.584a5.42 5.42 0 00-5.413 5.413 5.42 5.42 0 005.413 5.414 5.42 5.42 0 005.413-5.414 5.42 5.42 0 00-5.413-5.413zm0 9.842a4.434 4.434 0 01-4.429-4.429 4.434 4.434 0 014.43-4.429 4.434 4.434 0 014.428 4.43 4.434 4.434 0 01-4.429 4.428z" />
        <Path d="M43.305 33.553a1.97 1.97 0 00-1.968 1.968 1.97 1.97 0 001.968 1.968 1.97 1.97 0 001.969-1.968 1.97 1.97 0 00-1.969-1.968zm0 2.952a.985.985 0 010-1.968.985.985 0 010 1.968zM44.733 38.474h-2.855c-.841 0-1.525.666-1.525 1.483v1.298c0 .175.093.338.245.426.825.477 1.761.73 2.707.73.947 0 1.883-.253 2.707-.73a.491.491 0 00.246-.426v-1.297c0-.819-.684-1.484-1.525-1.484zm.54 2.487a4.462 4.462 0 01-3.936 0v-1.003c0-.276.242-.5.54-.5h2.856c.298 0 .54.224.54.5v1.003zM31.495 37.49a5.42 5.42 0 00-5.414 5.413 5.42 5.42 0 005.414 5.413 5.42 5.42 0 005.413-5.413 5.42 5.42 0 00-5.413-5.413zm0 9.842a4.434 4.434 0 01-4.43-4.43 4.434 4.434 0 014.43-4.428 4.434 4.434 0 014.429 4.429 4.434 4.434 0 01-4.43 4.429z" />
        <Path d="M31.495 39.458a1.97 1.97 0 00-1.969 1.968 1.97 1.97 0 001.969 1.969 1.97 1.97 0 001.968-1.969 1.97 1.97 0 00-1.968-1.968zm0 2.953a.985.985 0 010-1.969.985.985 0 010 1.968zM32.922 44.379h-2.855c-.84 0-1.525.666-1.525 1.484v1.297c0 .176.094.338.246.426.824.477 1.76.73 2.707.73.946 0 1.882-.253 2.707-.73a.491.491 0 00.245-.426v-1.297c0-.818-.684-1.484-1.525-1.484zm.541 2.488a4.462 4.462 0 01-3.937 0v-1.004c0-.275.243-.5.541-.5h2.855c.299 0 .541.225.541.5v1.004zM25.097 25.187a5.42 5.42 0 00-5.413 5.413 5.42 5.42 0 005.413 5.413 5.42 5.42 0 005.414-5.413 5.42 5.42 0 00-5.414-5.413zm0 9.842a4.434 4.434 0 01-4.429-4.429 4.434 4.434 0 014.43-4.429 4.434 4.434 0 014.428 4.429 4.434 4.434 0 01-4.429 4.429z" />
        <Path d="M25.097 27.155a1.97 1.97 0 00-1.968 1.969 1.97 1.97 0 001.968 1.968 1.97 1.97 0 001.969-1.968 1.97 1.97 0 00-1.969-1.969zm0 2.953a.985.985 0 010-1.969.985.985 0 010 1.969zM26.525 32.076H23.67c-.841 0-1.525.666-1.525 1.484v1.297c0 .176.093.338.245.426.825.478 1.761.73 2.707.73.947 0 1.883-.252 2.707-.73a.491.491 0 00.246-.425V33.56c0-.819-.684-1.485-1.525-1.485zm.54 2.488a4.462 4.462 0 01-3.936 0V33.56c0-.276.243-.5.54-.5h2.856c.298 0 .54.224.54.5v1.003zM36.908 18.79a5.42 5.42 0 00-5.413 5.413 5.42 5.42 0 005.413 5.413 5.42 5.42 0 005.413-5.413 5.42 5.42 0 00-5.413-5.413zm0 9.842a4.434 4.434 0 01-4.429-4.43 4.434 4.434 0 014.429-4.428 4.434 4.434 0 014.429 4.429 4.434 4.434 0 01-4.43 4.429z" />
        <Path d="M36.908 20.758a1.97 1.97 0 00-1.968 1.968 1.97 1.97 0 001.968 1.969 1.97 1.97 0 001.968-1.969 1.97 1.97 0 00-1.968-1.968zm0 2.953a.985.985 0 010-1.969.985.985 0 010 1.968zM38.336 25.679H35.48c-.84 0-1.525.666-1.525 1.484v1.297c0 .175.094.338.246.426.825.477 1.76.73 2.707.73.946 0 1.882-.253 2.707-.73a.492.492 0 00.246-.426v-1.297c0-.818-.684-1.484-1.525-1.484zm.54 2.488a4.462 4.462 0 01-3.936 0v-1.004c0-.275.242-.5.54-.5h2.856c.298 0 .54.225.54.5v1.004zM32.361 23.882a.493.493 0 00-.694-.053l-3.41 2.918a.492.492 0 10.64.747l3.41-2.918a.492.492 0 00.054-.694z" />
        <Path d="M43.207 31.782l-2.953-3.937a.492.492 0 00-.787.59l2.952 3.937a.492.492 0 00.788-.59zM39.168 38.625a.492.492 0 00-.689-.099l-2.749 2.062a.492.492 0 10.59.787l2.75-2.062a.492.492 0 00.098-.688zM26.574 42.41h-3.445a.492.492 0 100 .985h3.445a.492.492 0 100-.985zM25.097 18.79a1.97 1.97 0 00-1.968 1.968 1.97 1.97 0 001.968 1.968 1.97 1.97 0 001.969-1.968 1.97 1.97 0 00-1.969-1.968zm0 2.952a.985.985 0 010-1.968.985.985 0 010 1.968z" />
        <Path d="M25.097 21.742a.492.492 0 00-.492.492v3.445a.492.492 0 10.984 0v-3.445a.492.492 0 00-.492-.492z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h68v68H0z" />
        </ClipPath>
        <ClipPath id="prefix__clip1">
          <Path fill="#fff" d="M19.684 18.79H49.21v29.526H19.684z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;