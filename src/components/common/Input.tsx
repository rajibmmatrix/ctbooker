import React, {FC, memo} from 'react';
import {
  View,
  Text,
  TextInputProps,
  ViewStyle,
  StyleSheet,
  TextInput,
} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {COLORS, FONTS, _styles} from '~styles';

interface Props extends TextInputProps {
  title: string;
  containerStyle?: ViewStyle;
  titleStyle?: ViewStyle;
  Icon: FC<SvgProps>;
  error?: boolean;
}

const Input: FC<Props> = ({
  title,
  titleStyle,
  containerStyle,
  Icon,
  error = false,
  ...props
}) => {
  const errorStyle = error ? {borderBottomColor: COLORS.Error} : null;

  return (
    <View style={[styles.container, containerStyle, errorStyle]}>
      <View style={styles.header}>
        <Icon width={14} height={14} />
        <Text style={[_styles.link, styles.title, titleStyle]}>{title}</Text>
      </View>
      <TextInput
        {...props}
        placeholderTextColor={COLORS.Light}
        style={[_styles.link, styles.input]}
      />
    </View>
  );
};

export default memo(Input);

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.Primary_Line,
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: COLORS.Light,
    marginLeft: 5,
  },
  input: {
    margin: 0,
    padding: 0,
    height: 30,
    width: '100%',
    paddingLeft: 19,
    fontWeight: '300',
    fontFamily: FONTS.Primary_Light,
    color: COLORS.Primary_Input,
  },
});
