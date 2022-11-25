import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Splash from 'react-native-splash-screen';
import {StackScreenProps} from 'types';
import {IMAGES} from '~constants';

export default function SplashScreen({navigation}: StackScreenProps<'Splash'>) {
  useEffect(() => {
    Splash.hide();
    navigation.replace('Auth');
    return () => {};
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={IMAGES.Splash} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
