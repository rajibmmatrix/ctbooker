import React, {FC, memo} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {COLORS, FONTS} from '~styles';

interface Props extends TextInputProps {
  Icon: FC<SvgProps>;
  title?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onPress?: () => void;
}

const BookingIconTitle: FC<Props> = ({
  Icon,
  title,
  placeholder,
  value,
  disabled = false,
  onPress,
  ...reset
}) => {
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.body}>
        <Icon width={20} height={20} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={COLORS.Secondary_Text}
          style={styles.input}
          value={value}
          editable={!disabled}
          {...reset}
        />
      </View>
    </TouchableOpacity>
  );
};

export default memo(BookingIconTitle);

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.Primary_Line,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: FONTS.Secondary_Regular,
    lineHeight: 14,
    textTransform: 'uppercase',
    color: COLORS.Light,
    marginLeft: 10 + 20,
  },
  input: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FONTS.Secondary_Medium,
    lineHeight: 16,
    color: COLORS.Light,
    margin: 0,
    padding: 0,
    marginLeft: 10,
    height: 35,
  },
});
