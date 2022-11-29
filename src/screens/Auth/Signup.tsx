import React, {FC, memo, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AuthButton, Button, Input} from '~components';
import {Icons, IMAGES} from '~constants';
import {COLORS, FONTS, _styles} from '~styles';
import {useTranslations} from '~translation';

interface Props {
  onMove: () => void;
  showSignup: () => void;
}

type ITabs = 'individual' | 'profesonal' | null;

const SignupScreen: FC<Props> = ({onMove, showSignup}) => {
  const tralation = useTranslations();
  const [tabs, setTabs] = useState<ITabs>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);

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
      source={!tabs ? IMAGES.Card : IMAGES.BigCard}
      style={!tabs ? styles.card : styles.bigCard}
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
      <View style={!tabs ? styles.body : styles.mainBody}>
        <AuthButton
          title={tralation.individual_btn}
          Icon={Icons.Profile}
          isSelected={tabs === 'individual'}
          onPress={() => {
            showSignup();
            setTabs('individual');
          }}
        />
        <AuthButton
          title={tralation.profesonal_btn}
          color={COLORS.Buttons[1]}
          Icon={Icons.UserSquare}
          isSelected={tabs === 'profesonal'}
          onPress={() => {
            showSignup();
            setTabs('profesonal');
          }}
        />
        {tabs ? (
          <View style={styles.subBody}>
            <Input
              title={tralation.fname}
              Icon={Icons.User}
              placeholder={tralation.fname}
            />
            <Input
              title={tralation.lname}
              Icon={Icons.User}
              placeholder={tralation.lname}
            />
            <Input
              title={tralation.email}
              Icon={Icons.SMS}
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
            <View style={styles.footer}>
              <TouchableOpacity onPress={() => setIsSelected(prev => !prev)}>
                <View
                  style={isSelected ? styles.selected : styles.unSelected}
                />
              </TouchableOpacity>
              <Text style={[_styles.link, styles.footerTitle]}>
                {tralation.termes_and_conditions}
              </Text>
            </View>
            <View style={styles.footerButton}>
              <Button
                title={tralation.signup_button}
                disabled={!isSelected}
                onPress={() => {}}
              />
            </View>
          </View>
        ) : null}
      </View>
    </ImageBackground>
  );
};

export default memo(SignupScreen);

const styles = StyleSheet.create({
  card: {
    padding: 10,
    width: '100%',
    backgroundColor: 'transparent',
    height: 319 + 17,
  },
  bigCard: {
    width: '100%',
    padding: 10,
    paddingBottom: 0,
    backgroundColor: 'transparent',
    height: 639 + 17,
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
    paddingRight: 8,
    paddingLeft: 10,
    paddingVertical: 12,
  },
  body: {
    flex: 1,
    marginTop: 48,
    paddingHorizontal: 30,
  },
  mainBody: {
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 30,
  },
  subBody: {
    flex: 1,
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerTitle: {
    color: COLORS.Primary_Link,
    marginLeft: 12,
  },
  footerButton: {
    bottom: -25,
    position: 'absolute',
    alignSelf: 'center',
  },
  selected: {
    height: 10,
    width: 10,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: COLORS.Light,
    backgroundColor: COLORS.Light,
  },
  unSelected: {
    height: 10,
    width: 10,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: COLORS.Light,
  },
});
