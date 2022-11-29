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
}

const Input: FC<Props> = ({
  title,
  titleStyle,
  containerStyle,
  Icon,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <Icon width={14} height={14} />
        <Text style={[_styles.link, styles.title, titleStyle]}>{title}</Text>
      </View>
      <TextInput {...props} style={[_styles.link, styles.input]} />
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
    marginLeft: 5,
  },
  input: {
    height: 35,
    width: '100%',
    paddingLeft: 19,
    fontWeight: '300',
    fontFamily: FONTS.Primary_Light,
    color: COLORS.Primary_Input,
  },
});
