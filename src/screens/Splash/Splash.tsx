import React, {useEffect} from 'react';
import {View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import Splash from 'react-native-splash-screen';
import {IMAGES} from '~constants';
import {COLORS} from '~styles';
import {StackScreenProps} from 'types';
import {checkLogin, useDispatch} from '~app';

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
      .catch(err => console.log(err))
      .finally(() => Splash.hide());
    return () => {};
  }, [navigation, dispatch]);

  return (
    <View style={styles.container}>
      <Image source={IMAGES.Splash} style={styles.image} />
      <ActivityIndicator
        size="large"
        animating={true}
        color={COLORS.Primary}
        style={styles.spinner}
      />
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
  spinner: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 230,
  },
});
