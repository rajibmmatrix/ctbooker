import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TabScreenProps} from 'types';
import {Button} from '~common';
import {COLORS} from '~styles';
import {LType, useTranslations} from '~translation';

export default function AccountScreen({}: TabScreenProps<'Account'>) {
  const translation = useTranslations();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Screen</Text>
      <Button
        title="Change to English"
        style={styles.button}
        onPress={() => translation.changeLanguage(LType.en)}
      />
      <Button
        title="Change tô French"
        style={styles.button}
        onPress={() => translation.changeLanguage(LType.fn)}
      />
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
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.Light,
  },
  button: {
    margin: 10,
  },
});
