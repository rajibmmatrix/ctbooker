import React, {useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Text,
} from 'react-native';
import {Container} from '~components';
import SignupScreen from './Signup';
import LoginScreen from './Login';
import {Icons, IMAGES} from '~constants';
import {useTranslations} from '~translation';
import {COLORS, SIZES, _styles} from '~styles';
import {StackScreenProps} from 'types';

const {height} = Dimensions.get('window');

export default function AuthScreen({}: StackScreenProps<'Auth'>) {
  const {translation} = useTranslations();
  const [showLogin, setShowLogin] = useState(true);
  const [isSignupShow, setIsSignupShow] = useState(false);

  return (
    <Container>
      <ScrollView
        style={[_styles.container]}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={IMAGES.Background}
          resizeMode="stretch"
          style={!isSignupShow ? styles.container : styles.signupContainer}>
          <Icons.Logo width={138} height={138} style={styles.logo} />
          <Text style={[_styles.subHeader, styles.title]}>
            {translation.login_title}
          </Text>
          <View style={styles.body}>
            {showLogin ? (
              <LoginScreen
                onMove={() => {
                  setShowLogin(false);
                  setIsSignupShow(false);
                }}
              />
            ) : (
              <SignupScreen
                onMove={() => {
                  setShowLogin(true);
                  setIsSignupShow(false);
                }}
                showSignup={() => setIsSignupShow(true)}
              />
            )}
          </View>
        </ImageBackground>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SIZES.V38 * 1.35, //76,
    //paddingBottom: 220, // SIZES.V110 * 2, //220,
    paddingHorizontal: SIZES.H28, //28,
    minHeight: height,
  },
  signupContainer: {
    flex: 1,
    paddingTop: SIZES.V38 * 1.35, //76,
    paddingBottom: SIZES.V195 * 1.35, //395,
    paddingHorizontal: SIZES.H28, //28,
    minHeight: height + 175,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: SIZES.V22, // 22,
  },
  title: {
    textAlign: 'center',
    marginBottom: SIZES.V38, //38,
    color: COLORS.Light,
  },
  body: {
    flex: 1,
  },
});
