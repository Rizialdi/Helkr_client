import React, { SFC } from 'react';
import { Text } from 'react-native';

interface Props {
  id: string;
}
const QueryDetails: SFC<Props> = ({ id }) => {
  return (
    <>
      <Text>Maison 1 {id}</Text>
    </>
  );
};

export default QueryDetails;
