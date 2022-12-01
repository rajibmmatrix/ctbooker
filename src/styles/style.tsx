import {StyleSheet} from 'react-native';
import {COLORS} from './colors';
import {FONTS} from './fonts';

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
    fontSize: 22,
    fontWeight: '700',
    fontFamily: FONTS.Primary_Bold,
    lineHeight: 33,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: FONTS.Primary_Medium,
    lineHeight: 24,
  },
  body: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: FONTS.Secondary_Medium,
    lineHeight: 18,
  },
  input: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: FONTS.Secondary_Medium,
    lineHeight: 18,
  },
  description: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FONTS.Secondary_Medium,
    lineHeight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: FONTS.Secondary_Medium,
    lineHeight: 21,
  },
  subTitle: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: FONTS.Primary_Medium,
    lineHeight: 16,
  },
  link: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: FONTS.Primary_Medium,
    lineHeight: 18,
  },
  bookingIcon: {
    marginBottom: 18,
    shadowColor: COLORS.Gray,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});

export default styles;
