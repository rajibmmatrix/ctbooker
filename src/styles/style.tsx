import {StyleSheet} from 'react-native';

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
});

export default styles;
