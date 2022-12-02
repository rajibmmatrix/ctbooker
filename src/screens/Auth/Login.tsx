import React, {FC, memo} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {Button, Input, Text} from '~common';
import {Icons, IMAGES} from '~constants';
import {COLORS, FONTS, _styles} from '~styles';
import {useTranslations} from '~translation';
import {startLoading, stopLoading, useActions} from '~app';

interface Props {
  onMove: () => void;
}

const LoginScreen: FC<Props> = ({onMove}) => {
  const dispatch = useActions();
  const navigation = useNavigation();
  const tralation = useTranslations();

  const selectedColor = [
    COLORS.Primary_Gradient[2],
    COLORS.Primary_Gradient[3],
  ];

  const unSelectedColor = [
    COLORS.Primary_Gradient[4],
    COLORS.Primary_Gradient[0],
    COLORS.Primary_Gradient[1],
  ];

  const handleLogin = () => {
    dispatch(startLoading());
    setTimeout(() => {
      dispatch(stopLoading());
      navigation.dispatch(
        CommonActions.reset({index: 1, routes: [{name: 'Sidebar'}]}),
      );
    }, 3000);
  };

  return (
    <ImageBackground
      source={IMAGES.Card}
      style={styles.card}
      imageStyle={styles.cardbody}>
      <View style={styles.header}>
        <LinearGradient
          colors={unSelectedColor}
          style={styles.button}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <LinearGradient
            colors={selectedColor}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.selectedButton}>
            <Text style={[_styles.link, styles.selectedTitle]}>
              {tralation.login_tab}
            </Text>
          </LinearGradient>
          <TouchableOpacity onPress={onMove} style={styles.buttonLink}>
            <Text style={[_styles.link, styles.unselectedTitle]}>
              {tralation.signup_tab}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={styles.body}>
        <Input
          title={tralation.email}
          Icon={Icons.User}
          placeholder={tralation.email}
          autoComplete="email"
          autoCapitalize="none"
        />
        <Input
          title={tralation.password}
          Icon={Icons.Lock}
          placeholder={tralation.password}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
          <Text style={[_styles.link, styles.link]}>
            {tralation.forgot_password}
          </Text>
        </TouchableOpacity>
        <View style={styles.footerButton}>
          <Button title={tralation.login_button} onPress={handleLogin} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default memo(LoginScreen);

const styles = StyleSheet.create({
  card: {
    padding: 10,
    width: '100%',
    paddingBottom: 0,
    backgroundColor: 'transparent',
    height: 319 + 17,
  },
  cardbody: {
    resizeMode: 'contain',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTitle: {
    fontWeight: '700',
    fontFamily: FONTS.Primary_Bold,
    color: COLORS.Light,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  unselectedTitle: {
    fontWeight: '300',
    fontFamily: FONTS.Primary_Light,
    color: COLORS.Light,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
  },
  selectedButton: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 25,
  },
  buttonLink: {
    paddingLeft: 5,
    paddingRight: 11,
    paddingVertical: 12,
  },
  body: {
    flex: 1,
    marginTop: 48,
    paddingHorizontal: 30,
  },
  link: {
    marginTop: -7,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  footerButton: {
    bottom: -25,
    position: 'absolute',
    alignSelf: 'center',
  },
});
