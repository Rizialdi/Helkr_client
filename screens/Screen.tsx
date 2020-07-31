import React, { FC, useState, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Swiper from '../components/Swiper';
import BienvenueFirst from './BienvenueFirst';
import BienvenueView from './BienvenueView';
import { mocks } from '../constants';

type illustration = {
  id: number;
  source?: NodeRequire;
  textP?: string;
  textS?: string;
};
type illustrations = Array<illustration>;
interface Props {}

const Screen: FC<Props> = () => {
  const [illustrations, setIllustration] = useState<illustrations | null>(null);

  useMemo(() => {
    setIllustration(mocks.illustrations);
  }, []);

  return (
    <Swiper>
      {illustrations?.map(illustration =>
        illustration?.id === 1 ? (
          <BienvenueFirst key={illustration.id} />
        ) : (
          <BienvenueView
            style={styles.slide}
            key={illustration.id}
            source={illustration['source']}
            textP={illustration['textP']}
            textS={illustration['textS']}
          />
        )
      )}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  header: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15
  },
  text: {
    color: 'black',
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: 'center'
  }
});

export default Screen;
