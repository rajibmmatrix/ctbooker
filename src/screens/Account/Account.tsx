import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
//import {Button} from '~common';
import {COLORS, FONTS, fontSize} from '~styles';
//import {useTranslations} from '~translation';
import {TabScreenProps} from 'types';

export default function AccountScreen({}: TabScreenProps<'Account'>) {
  //const translation = useTranslations();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coming soon</Text>
      {/* <Button
        title="Change to English"
        style={styles.button}
        onPress={() => translation.changeLanguage('en')}
      />
      <Button
        title="Change tô French"
        style={styles.button}
        onPress={() => translation.changeLanguage('fr')}
      /> */}
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
  button: {
    margin: 10,
  },
});
