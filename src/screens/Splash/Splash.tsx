import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Splash from 'react-native-splash-screen';
import {IMAGES} from '~constants';
import {checkLogin, useDispatch} from '~app';
import {StackScreenProps} from 'types';

export default function SplashScreen({navigation}: StackScreenProps<'Splash'>) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin())
      .unwrap()
      .then(data => {
        if (data.isLogin) {
          return navigation.replace('Sidebar');
        }
        navigation.replace('Auth');
      })
      .catch(() => navigation.replace('Auth'))
      .finally(() => Splash.hide());
    return () => {};
  }, [navigation, dispatch]);

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
