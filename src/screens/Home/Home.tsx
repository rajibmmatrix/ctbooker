import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TabScreenProps} from 'types';
import {Button} from '~common';
import {LType, useTranslations} from '~translation';

export default function HomeScreen({}: TabScreenProps<'Home'>) {
  const translations = useTranslations();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button
        title="Change Language to Engligh"
        onPress={() => translations.changeLanguage!(LType.en)}
        style={styles.button}
      />
      <Button
        title="Changer la langue en français"
        style={styles.button}
        onPress={() => translations.changeLanguage!(LType.fn)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  button: {
    marginVertical: 10,
  },
});
