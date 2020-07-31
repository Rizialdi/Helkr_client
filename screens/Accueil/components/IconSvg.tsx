import React, { SFC } from 'react';
import { HouseSvg, StudentSvg } from '../../../assets/icons';

interface Props {
  kind: 'house' | 'student';
}
const Icon: SFC<Props> = ({ kind, ...props }) => {
  return (
    <>
      {kind === 'house' ? (
        <HouseSvg {...props} />
      ) : kind === 'student' ? (
        <StudentSvg {...props} />
      ) : null}
    </>
  );
};

export default Icon;
