import React, {FC} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {IMAGES} from '~constants';
import {COLORS, _styles} from '~styles';
import {useTranslations} from '~translation';

interface Props {
  onMove: () => void;
}

const SignupScreen: FC<Props> = ({onMove}) => {
  const tralation = useTranslations();

  const selectedColor = [
    COLORS.Primary_Gradient[3],
    COLORS.Primary_Gradient[2],
  ];

  const unSelectedColor = [
    COLORS.Primary_Gradient[0],
    COLORS.Primary_Gradient[1],
  ];

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
          <TouchableOpacity onPress={onMove} style={styles.buttonLink}>
            <Text style={[_styles.link, styles.unselectedTitle]}>
              {tralation.login_tab}
            </Text>
          </TouchableOpacity>
          <LinearGradient
            colors={selectedColor}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.selectedButton}>
            <Text style={[_styles.link, styles.selectedTitle]}>
              {tralation.signup_tab}
            </Text>
          </LinearGradient>
        </LinearGradient>
      </View>
      <View style={styles.body}>
        <Text>Signup Screen</Text>
      </View>
    </ImageBackground>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    width: '100%',
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
    color: COLORS.Light,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  unselectedTitle: {
    fontWeight: '500',
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
    paddingRight: 8,
    paddingLeft: 10,
    paddingVertical: 12,
  },
  body: {
    flex: 1,
  },
});
