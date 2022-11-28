import React, {FC, memo} from 'react';
import {StyleSheet, Text as RText, TextProps, TextStyle} from 'react-native';

interface Props {
  children: string;
  style?: TextStyle | TextStyle[];
  color?: string;
  size?: number;
  props?: TextProps;
}

const Text: FC<Props> = ({children, style, color, size, ...props}) => {
  return (
    <RText
      style={[styles.title, style, {color: color, fontSize: size}]}
      {...props}>
      {children}
    </RText>
  );
};

export default memo(Text);

const styles = StyleSheet.create({
  title: {},
  bold: {},
  semibold: {},
});
