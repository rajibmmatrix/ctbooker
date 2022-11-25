import React, {FC, memo} from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  style: ViewStyle;
  textStyle: TextStyle;
  color: string;
  textColor: string;
  disabled: boolean;
}

const Button: FC<Props> = ({
  title,
  textStyle,
  onPress,
  style,
  color,
  textColor,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, style, {backgroundColor: color}]}>
      <Text style={[styles.title, textStyle, {color: textColor}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default memo(Button);

const styles = StyleSheet.create({
  button: {},
  title: {},
});
