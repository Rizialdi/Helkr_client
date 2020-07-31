import React, { SFC } from 'react';
import { Text } from '../../sharedComponents';

interface Props {
  username: string;
}
const UserWelcome: SFC<Props> = ({ username }) => {
  return (
    <>
      <Text
        bold
        style={{
          fontFamily: 'josefinLight',
          marginHorizontal: 23,
          marginVertical: 20
        }}>
        Bonjour{' '}
        <Text style={{ fontFamily: 'josefinRegular', fontSize: 16 }}>
          {username}
        </Text>
      </Text>
      <Text
        style={{
          fontFamily: 'josefinRegular',
          fontSize: 16,
          marginHorizontal: 23,
          marginBottom: 20
        }}>
        Quels services recherchez-vous ?
      </Text>
    </>
  );
};

export default UserWelcome;
