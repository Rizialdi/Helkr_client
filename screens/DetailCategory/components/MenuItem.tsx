import React, { SFC, useState } from 'react';

import { View, Button } from 'react-native';

interface Props {
  children: JSX.Element;
  values: string;
  currentIndex: number;
  totalChildren: number;
  isLast: boolean;
  onSubmit: () => void;
  nextStep: () => void;
  prevStep: () => void;
  onChangeValue: () => void;
  onSelected: () => void;
}
const MenuItem: SFC<Props> = ({ children, ...props }) => {
  const width = (props.currentIndex / props.totalChildren) * 100;
  const [selected, setSelected] = useState<boolean>(false);
  return (
    <View>
      <View style={{ width: '100%', height: 5, backgroundColor: 'red' }}>
        <View
          style={{ width: `${width}%`, height: 5, backgroundColor: 'yellow' }}
        ></View>
      </View>
      {React.cloneElement(children, {
        values: props.values,
        onChange: props.onChangeValue,
        onSelected: setSelected
      })}
      <Button
        title="Precedent"
        disabled={props.currentIndex === 0}
        onPress={() => props.prevStep()}
      />
      {!props.isLast ? (
        <Button
          title="Suivant"
          disabled={props.isLast || !selected}
          onPress={() => props.nextStep()}
        />
      ) : (
        <Button
          title="Soumettre"
          disabled={!selected}
          onPress={() => props.onSubmit()}
        />
      )}
    </View>
  );
};

export default MenuItem;
