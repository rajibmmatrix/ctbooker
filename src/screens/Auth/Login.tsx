import React, {FC, memo, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {Button, Input} from '~common';
import {Icons, IMAGES} from '~constants';
import {useTranslations} from '~translation';
import {COLORS, FONTS, screenHeight, SIZES, _styles} from '~styles';
import {login, startLoading, stopLoading, useDispatch, useSelector} from '~app';
import {showToaster} from '~utils';

interface Props {
  onMove: () => void;
}

const LoginScreen: FC<Props> = ({onMove}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {translation} = useTranslations();

  const user = useSelector(store => store.auth.user);

  const [form, setForm] = useState<{email: string; password: string}>({
    email: user?.email ? user.email : '',
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
      return showToaster(translation.login_error, 'error');
    }
    dispatch(startLoading());
    dispatch(login(form))
      .unwrap()
      .then(() => {
        navigation.dispatch(
          CommonActions.reset({index: 1, routes: [{name: 'Sidebar'}]}),
        );
      })
      .catch(() => {})
      .finally(() => dispatch(stopLoading()));
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
    padding: SIZES.H10, //10,
    width: '100%',
    paddingBottom: 0,
    backgroundColor: 'transparent',
    minHeight: screenHeight * 0.37,
  },
  cardbody: {
    resizeMode: 'stretch',
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
    paddingHorizontal: SIZES.H10, //10,
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
    paddingVertical: SIZES.V12, //12,
    paddingHorizontal: SIZES.H10, //10,
    borderRadius: 25,
  },
  buttonLink: {
    paddingLeft: SIZES.H5, //5,
    paddingRight: SIZES.H10, //10
    paddingVertical: SIZES.V12, //12,
  },
  body: {
    flex: 1,
    marginTop: SIZES.V45 * 0.8, //45,
    paddingHorizontal: SIZES.H15 * 2, //30,
  },
  link: {
    marginTop: -SIZES.H7,
    paddingBottom: SIZES.V22 * 2,
    textAlign: 'center',
    textTransform: 'capitalize',
    color: COLORS.Primary_Link,
  },
  footerButton: {
    bottom: -25,
    position: 'absolute',
    alignSelf: 'center',
  },
});
