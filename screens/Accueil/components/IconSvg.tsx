import React, { SFC } from 'react';
import {
  IdeasSvg,
  EventSvg,
  HouseSvg,
  CourseSvg,
  HomeHelpSvg,
  BodyCareSvg,
  TransportSvg,
  MultimediaSvg
} from '../../../assets/icons';

interface Props {
  kind:
    | 'house'
    | 'course'
    | 'homehelp'
    | 'bodycare'
    | 'transport'
    | 'multimedia'
    | 'event'
    | 'ideas';
}

const Icon: SFC<Props> = ({ kind, ...props }) => {
  return (
    <>
      {kind === 'house' ? (
        <HouseSvg {...props} />
      ) : kind === 'course' ? (
        <CourseSvg {...props} />
      ) : kind === 'homehelp' ? (
        <HomeHelpSvg {...props} />
      ) : kind === 'bodycare' ? (
        <BodyCareSvg {...props} />
      ) : kind === 'transport' ? (
        <TransportSvg {...props} />
      ) : kind === 'event' ? (
        <EventSvg {...props} />
      ) : kind === 'multimedia' ? (
        <MultimediaSvg {...props} />
      ) : kind === 'ideas' ? (
        <IdeasSvg {...props} />
      ) : null}
    </>
  );
};

export default Icon;
