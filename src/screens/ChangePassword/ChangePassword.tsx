import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, fontSize} from '~styles';
import {SideScreenProps} from 'types';

export default function ChangePasswordScreen({}: SideScreenProps<'ChangePassword'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.Primary_Background[0],
  },
  title: {
    fontSize: fontSize(14),
    fontWeight: 'bold',
    fontFamily: FONTS.Primary_Bold,
    color: COLORS.Light,
  },
});
