import React, {useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {Button, Container, Input} from '~components';
import {Icons, IMAGES} from '~constants';
import {useTranslations} from '~translation';
import {forgot, loading, useDispatch} from '~app';
import {COLORS, screenHeight, SIZES, statusHeight, _styles} from '~styles';
import {showToaster} from '~utils';
import {StackScreenProps} from 'types';

export default function ForgotScreen({navigation}: StackScreenProps<'Forgot'>) {
  const dispatch = useDispatch();
  const {translation} = useTranslations();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const handleForgot = () => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    if (!email.trim() || !reg.test(email.trim())) {
      setError(true);
      return showToaster(translation.enter_email, 'error');
    }
    setError(false);
    dispatch(loading(true));
    dispatch(forgot({email}))
      .unwrap()
      .then(() => {
        navigation.dispatch(
          CommonActions.reset({index: 1, routes: [{name: 'Auth'}]}),
        );
      })
      .catch(() => {})
      .finally(() => dispatch(loading(false)));
  };

  return (
    <Container>
      <ScrollView
        scrollEnabled={false}
        style={[_styles.container]}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={IMAGES.Background}
          resizeMode="stretch"
          style={styles.container}>
          <Icons.Logo width={138} height={138} style={styles.logo} />
          <Text style={[_styles.subHeader, styles.title]}>
            {translation.forgot_title}
          </Text>
          <ImageBackground
            source={IMAGES.Card}
            resizeMode="stretch"
            style={styles.card}>
            <View style={styles.body}>
              <Input
                title={translation.email}
                Icon={Icons.User}
                placeholder={translation.email}
                autoComplete="email"
                autoCapitalize="none"
                onChangeText={setEmail}
                value={email}
                error={error}
              />
              <TouchableOpacity onPress={() => navigation.navigate('Auth')}>
                <Text style={[_styles.link, styles.link]}>
                  {translation.already_have_account}
                </Text>
              </TouchableOpacity>
              <View style={styles.footerButton}>
                <Button title={translation.send} onPress={handleForgot} />
              </View>
            </View>
          </ImageBackground>
        </ImageBackground>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: SIZES.V38 * 1.22, //76,
    paddingHorizontal: SIZES.H28, //28,
    minHeight: screenHeight - statusHeight,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: SIZES.V15 * 0.9, // 22,
  },
  title: {
    textAlign: 'center',
    marginBottom: SIZES.V38 * 0.8, //38,
    color: COLORS.Light,
  },
  card: {
    width: '100%',
    padding: SIZES.H10, //10,
    paddingBottom: 0,
    backgroundColor: 'transparent',
  },
  body: {
    flex: 1,
    marginTop: SIZES.V45 * 1.2, //45,
    paddingHorizontal: SIZES.H15 * 2, //30,
  },
  link: {
    paddingBottom: SIZES.V22 * 2.2,
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
