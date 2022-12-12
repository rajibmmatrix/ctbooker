import {StyleSheet} from 'react-native';
import {COLORS} from './colors';
import {FONTS} from './fonts';
import {fontSize, SIZES} from './sizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowAllCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowCenterSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  allCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  space: {
    justifyContent: 'space-between',
  },
  line: {
    height: 1,
    color: 'red',
  },
  header: {
    fontSize: fontSize(22),
    fontWeight: '700',
    fontFamily: FONTS.Primary_Bold,
    lineHeight: 33,
  },
  subHeader: {
    fontSize: fontSize(16),
    fontWeight: '500',
    fontFamily: FONTS.Primary_Medium,
    lineHeight: 24,
  },
  body: {
    fontSize: fontSize(15),
    fontWeight: '500',
    fontFamily: FONTS.Secondary_Medium,
    lineHeight: 18,
  },
  input: {
    fontSize: fontSize(12),
    fontWeight: '500',
    fontFamily: FONTS.Secondary_Medium,
    lineHeight: 18,
  },
  description: {
    fontSize: fontSize(14),
    fontWeight: '500',
    fontFamily: FONTS.Secondary_Medium,
    lineHeight: 16,
  },
  title: {
    fontSize: fontSize(18),
    fontWeight: '500',
    fontFamily: FONTS.Secondary_Medium,
    lineHeight: 21,
  },
  subTitle: {
    fontSize: fontSize(11),
    fontWeight: '500',
    fontFamily: FONTS.Primary_Medium,
    lineHeight: 16,
  },
  link: {
    fontSize: fontSize(12),
    fontWeight: '500',
    fontFamily: FONTS.Primary_Medium,
    lineHeight: 18,
  },
  bookingIcon: {
    marginBottom: SIZES.V18,
    borderRadius: 100,
    shadowColor: COLORS.Gray,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});

export default styles;
