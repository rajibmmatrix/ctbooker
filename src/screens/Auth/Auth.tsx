import React, {useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import {Container, Text} from '~components';
import {Icons, IMAGES} from '~constants';
import {useTranslations} from '~translation';
import SignupScreen from './Signup';
import LoginScreen from './Login';
import {StackScreenProps} from 'types';
import {COLORS, _styles} from '~styles';

const {height} = Dimensions.get('window');

export default function AuthScreen({}: StackScreenProps<'Auth'>) {
  const tralation = useTranslations();
  const [showLogin, setShowLogin] = useState(true);
  const [isSignupShow, setIsSignupShow] = useState(false);

  return (
    <Container>
      <ScrollView
        style={[_styles.container]}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={IMAGES.Background}
          style={!isSignupShow ? styles.container : styles.signupContainer}>
          <Icons.Logo width={138} height={138} style={styles.logo} />
          <Text style={[_styles.subHeader, styles.title]}>
            {tralation.login_title}
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
    paddingTop: 76,
    paddingBottom: 220,
    paddingHorizontal: 28,
    minHeight: height,
  },
  signupContainer: {
    flex: 1,
    paddingTop: 76,
    paddingBottom: 395,
    paddingHorizontal: 28,
    minHeight: height + 175,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 22,
  },
  title: {
    textAlign: 'center',
    marginBottom: 38,
    color: COLORS.Light,
  },
  body: {
    flex: 1,
  },
});
