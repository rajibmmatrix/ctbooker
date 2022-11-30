import React, {FC, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {Icons} from '~constants';
import {COLORS, FONTS} from '~styles';

interface Props {
  title: string;
  color: string;
  Icon: FC<SvgProps>;
  onPress: () => void;
}

const BookingButton: FC<Props> = ({title, color, Icon, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, {backgroundColor: color}]}>
      <View style={styles.image}>
        <Icon width={32} height={32} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Icons.ArrowCircleRight height={24} width={24} />
    </TouchableOpacity>
  );
};

export default memo(BookingButton);

const styles = StyleSheet.create({
  button: {
    height: 83,
    borderRadius: 30,
    marginBottom: 39,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 30,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    fontFamily: FONTS.Primary_Medium,
    textAlign: 'left',
    color: COLORS.Light,
    marginLeft: 14,
  },
  image: {
    width: 75,
    height: 75,
    borderWidth: 6,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.Light,
    borderColor: COLORS.Icon_Border,
    top: -14,
    left: -3,
  },
});
