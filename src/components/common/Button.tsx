import React, {FC, memo} from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, _styles} from '~styles';

interface Props {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  color?: [];
  disabled?: boolean;
}

const Button: FC<Props> = ({
  title,
  textStyle,
  onPress,
  style,
  color,
  disabled = false,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <LinearGradient
        colors={color ? color : COLORS.Primary_Button}
        style={[styles.button, style]}>
        <Text style={[_styles.link, styles.title, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default memo(Button);

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 135,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: COLORS.Primary_Link,
  },
});
