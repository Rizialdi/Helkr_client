import React, { SFC } from 'react';
import { Text } from '../../sharedComponents';
import { theme } from '../../../constants';

interface Props {
  username: string;
}
const UserWelcome: SFC<Props> = ({ username }) => {
  return (
    <>
      <Text
        style={{
          fontFamily: 'josefinLight',
          marginHorizontal: theme.sizes.twiceTen * 1.15,
          marginVertical: theme.sizes.htwiceTen
        }}>
        Bonjour{' '}
        <Text
          style={{
            fontFamily: 'josefinRegular',
            fontSize: theme.sizes.header
          }}>
          {username}
        </Text>
      </Text>
      <Text
        style={{
          fontFamily: 'josefinRegular',
          fontSize: theme.sizes.header,
          marginHorizontal: theme.sizes.twiceTen * 1.15,
          marginBottom: theme.sizes.htwiceTen
        }}>
        Quels services recherchez-vous ?
      </Text>
    </>
  );
};

export default UserWelcome;
