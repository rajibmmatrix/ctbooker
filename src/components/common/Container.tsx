import React, {FC, memo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface Props {
  style: ViewStyle;
  children: React.ReactNode;
  color: string;
}

const Container: FC<Props> = ({children, style, color}) => {
  return (
    <View style={[styles.container, style, {backgroundColor: color}]}>
      {children}
    </View>
  );
};

export default memo(Container);

const styles = StyleSheet.create({
  container: {},
});
