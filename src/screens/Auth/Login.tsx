import React, {FC, memo, useState} from 'react';
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
import {useTranslations} from '~translation';
import {COLORS, FONTS, _styles} from '~styles';
import {login, startLoading, stopLoading, useDispatch} from '~app';
import {log, showToaster} from '~utils';

interface Props {
  onMove: () => void;
}

const LoginScreen: FC<Props> = ({onMove}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {translation} = useTranslations();

  const [form, setForm] = useState<{email: string; password: string}>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<{email: string; password: string}>({
    email: '',
    password: '',
  });

  const checkValidation = () => {
    let status = false;
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    const isError = {email: '', password: ''};
    if (!form.email.trim()) {
      status = true;
      isError.email = 'Email is required.';
    } else if (!reg.test(form.email.trim())) {
      status = true;
      isError.email = 'Email not valid.';
    }
    if (!form.password.trim()) {
      status = true;
      isError.password = 'Password is required.';
    }
    setError(isError);
    return status;
  };

  const handleLogin = () => {
    if (checkValidation()) {
      return showToaster('Please enter a valid email and password', 'error');
    }
    dispatch(startLoading());
    setTimeout(() => {
      dispatch(stopLoading());
      navigation.dispatch(
        CommonActions.reset({index: 1, routes: [{name: 'Sidebar'}]}),
      );
    }, 3000);
    /* var formData = new FormData();
    formData.append('email', form.email);
    formData.append('password', form.password);
    formData.append('lang', 'en');
    dispatch(startLoading());
    dispatch(login(formData as any))
      .unwrap()
      .then(res => {
        log(res);
        navigation.dispatch(
          CommonActions.reset({index: 1, routes: [{name: 'Sidebar'}]}),
        );
      })
      .catch(() => {
        //log(err);
      })
      .finally(() => dispatch(stopLoading())); */
  };

  return (
    <ImageBackground
      source={IMAGES.Card}
      style={styles.card}
      imageStyle={styles.cardbody}>
      <View style={styles.header}>
        <LinearGradient
          colors={[
            COLORS.Primary_Gradient[4],
            COLORS.Primary_Gradient[0],
            COLORS.Primary_Gradient[1],
          ]}
          style={styles.button}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <LinearGradient
            colors={[COLORS.Primary_Gradient[2], COLORS.Primary_Gradient[3]]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.selectedButton}>
            <Text style={[_styles.link, styles.selectedTitle]}>
              {translation.login_tab}
            </Text>
          </LinearGradient>
          <TouchableOpacity onPress={onMove} style={styles.buttonLink}>
            <Text style={[_styles.link, styles.unselectedTitle]}>
              {translation.signup_tab}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={styles.body}>
        <Input
          title={translation.email}
          Icon={Icons.User}
          placeholder={translation.email}
          autoComplete="email"
          autoCapitalize="none"
          onChangeText={(e: string) => setForm(prev => ({...prev, email: e}))}
          value={form.email}
          error={!!error.email}
        />
        <Input
          title={translation.password}
          Icon={Icons.Lock}
          placeholder={translation.password}
          secureTextEntry={true}
          onChangeText={(e: string) =>
            setForm(prev => ({...prev, password: e}))
          }
          value={form.password}
          error={!!error.password}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
          <Text style={[_styles.link, styles.link]}>
            {translation.forgot_password}
          </Text>
        </TouchableOpacity>
        <View style={styles.footerButton}>
          <Button title={translation.login_button} onPress={handleLogin} />
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
