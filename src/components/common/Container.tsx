import React, {FC, memo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {COLORS} from '~styles';

interface Props {
  style?: ViewStyle;
  children: React.ReactNode;
  color?: string;
}

const Container: FC<Props> = ({children, style, color}) => {
  return (
    <View
      style={[
        styles.container,
        style,
        color ? {backgroundColor: color} : null,
      ]}>
      {children}
    </View>
  );
};

export default memo(Container);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Primary_Background[0],
  },
});
