import React, { useState, useMemo, useRef } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { Text } from '../sharedComponents';
import { Dots, MarkPresentation, OnBoardingTemplate } from './components';
import { mocks, theme } from '../../constants';
import {
  StackNavigationInterface,
  MainStackParamList
} from '../../navigation/Routes';
import { useStoreState } from '../../models';

const { width } = Dimensions.get('screen');

type illustration = {
  id: number;
  textP?: string;
  textS?: string;
};

type illustrations = illustration[];

export default function App({
  navigation
}: StackNavigationInterface<MainStackParamList, 'OnBoarding'>): JSX.Element {
  const { themeColors } = useStoreState(state => state.Preferences);
  const [pagePosition, setPagePosition] = useState<number>(1);

  const scrollTo = (position: number): void => {
    setPagePosition(position);
    if (scroll.current) {
      scroll.current.scrollTo({
        x: width * (position - 1),
        y: 0
      });
    }
  };

  const onScrollHandler = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ): void => {
    const scrollViewX = event.nativeEvent.contentOffset.x;
    if (scrollViewX % width === 0) {
      scrollTo(scrollViewX / width + 1);
    }
  };

  const [illustrations, setIllustration] = useState<illustrations | null>(null);

  useMemo(() => {
    setIllustration(mocks.illustrations);
  }, []);

  const scroll = useRef<ScrollView>(null);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColors.background
        }
      ]}>
      <ScrollView
        style={{ flex: 1, minWidth: '100%' }}
        onScroll={onScrollHandler}
        alwaysBounceHorizontal={true}
        horizontal
        pagingEnabled={true}
        snapToInterval={width}
        decelerationRate="fast"
        bounces={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        ref={scroll}>
        <View style={styles.onboardingView}>
          <MarkPresentation />
        </View>
        {illustrations?.map((item, idx) => (
          <View key={idx} style={styles.onboardingView}>
            <OnBoardingTemplate
              idx={item.id}
              textP={item.textP}
              textS={item.textS}
            />
          </View>
        ))}
      </ScrollView>
      <View
        style={[
          styles.dots,
          {
            borderTopColor: themeColors.gray
          }
        ]}>
        <View style={{ flexDirection: 'row' }}>
          {illustrations &&
            [{}, ...illustrations]?.map((_, idx) => (
              <Dots key={idx} isActive={idx === pagePosition - 1} />
            ))}
        </View>
        <View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: themeColors.secondary }]}
            onPress={(): void =>
              illustrations && pagePosition < illustrations.length + 1
                ? scrollTo(pagePosition + 1)
                : navigation.navigate('RegisterPhoneNumber')
            }>
            <Text bold>
              {pagePosition === 1
                ? 'Demarrer'
                : illustrations && pagePosition === illustrations.length + 1
                ? "S'incrire"
                : 'Continuer'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  onboardingView: {
    flex: 1,
    width: width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    paddingVertical: theme.sizes.twiceTen / 2,
    width: theme.sizes.screenWidth / 2.5,
    borderRadius: theme.sizes.radius,
    alignItems: 'center'
  },
  dots: {
    flex: 0.1,
    borderTopWidth: StyleSheet.hairlineWidth,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    width: width,
    paddingHorizontal: width * 0.05,
    flexDirection: 'row'
  }
});
