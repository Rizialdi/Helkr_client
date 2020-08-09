import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const colors = {
  accent: '#F3534A',
  primary: '#0094FF',
  secondary: '#2BDA8E',
  tertiary: '#FFE358',
  black: '#323643',
  white: '#FFFFFF',
  gray: '#9DA3B4',
  gray2: '#C5CCD6'
};

const sizes = {
  // global sizes
  twiceTen: wp('4.85%'), //20
  base: wp('3.87%'), //16
  htwiceTen: hp('2.7%'), //
  rtwiceTen: hp('2.7%'), //
  hbase: hp('2.16%'), //
  font: wp('3.39%'), //14
  radius: wp('1.45%'), // 6
  inouting: wp('6.05%'), // 25

  // font sizes
  h1: wp('6.3%'), //26
  h2: wp('4.84%'), // 20
  h3: wp('4.36%'), // 18
  title: wp('4.36%'), //18
  header: wp('3.87%'), //16
  body: wp('3.39%'), //14
  caption: wp('2.91%'), //12
  small: wp('2.42%'), //10
  border: wp('1.21%') //5
};

const fonts = {
  h1: {
    fontSize: sizes.h1
  },
  h2: {
    fontSize: sizes.h2
  },
  h3: {
    fontSize: sizes.h3
  },
  header: {
    fontSize: sizes.header
  },
  title: {
    fontSize: sizes.title
  },
  body: {
    fontSize: sizes.body
  },
  caption: {
    fontSize: sizes.caption
  },
  small: {
    fontSize: sizes.small
  }
};

export { colors, sizes, fonts };
