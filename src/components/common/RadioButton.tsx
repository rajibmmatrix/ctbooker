import React, {FC, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {Icons} from '~constants';
import {COLORS, FONTS} from '~styles';

interface Props {
  title: string;
  isSelected: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

const RadioButton: FC<Props> = ({isSelected, title, style, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      {!isSelected ? <Icons.RadioBtton /> : <Icons.SelectedRadioButton />}
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default memo(RadioButton);

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    fontFamily: FONTS.Secondary_Regular,
    color: COLORS.Light,
    marginLeft: 10,
  },
});
