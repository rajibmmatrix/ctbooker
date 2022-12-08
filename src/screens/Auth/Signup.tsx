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
import {COLORS, FONTS, screenHeight, SIZES, _styles} from '~styles';
import {useTranslations} from '~translation';

interface Props {
  onMove: () => void;
  showSignup: () => void;
}

type ITabs = 'individual' | 'profesonal' | null;

const SignupScreen: FC<Props> = ({onMove, showSignup}) => {
  const {translation} = useTranslations();
  const [tabs, setTabs] = useState<ITabs>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <ImageBackground
      source={!tabs ? IMAGES.Card : IMAGES.BigCard}
      style={!tabs ? styles.card : styles.bigCard}
      imageStyle={styles.cardbody}>
      <View style={styles.header}>
        <LinearGradient
          colors={[COLORS.Primary_Gradient[0], COLORS.Primary_Gradient[1]]}
          style={styles.button}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <TouchableOpacity onPress={onMove} style={styles.buttonLink}>
            <Text style={[_styles.link, styles.unselectedTitle]}>
              {translation.login_tab}
            </Text>
          </TouchableOpacity>
          <LinearGradient
            colors={[COLORS.Primary_Gradient[3], COLORS.Primary_Gradient[2]]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.selectedButton}>
            <Text style={[_styles.link, styles.selectedTitle]}>
              {translation.signup_tab}
            </Text>
          </LinearGradient>
        </LinearGradient>
      </View>
      <View style={!tabs ? styles.body : styles.mainBody}>
        <AuthButton
          title={translation.individual_btn}
          Icon={Icons.Profile}
          isSelected={tabs === 'individual'}
          onPress={() => {
            showSignup();
            setTabs('individual');
          }}
        />
        <AuthButton
          title={translation.profesonal_btn}
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
              title={translation.fname}
              Icon={Icons.User}
              placeholder={translation.fname}
            />
            <Input
              title={translation.lname}
              Icon={Icons.User}
              placeholder={translation.lname}
            />
            <Input
              title={translation.email}
              Icon={Icons.SMS}
              placeholder={translation.email}
              autoComplete="email"
              autoCapitalize="none"
            />
            <Input
              title={translation.password}
              Icon={Icons.Lock}
              placeholder={translation.password}
              secureTextEntry={true}
            />
            <View style={styles.footer}>
              <TouchableOpacity onPress={() => setIsSelected(prev => !prev)}>
                <View
                  style={isSelected ? styles.selected : styles.unSelected}
                />
              </TouchableOpacity>
              <Text style={[_styles.link, styles.footerTitle]}>
                {translation.termes_and_conditions}
              </Text>
            </View>
            <View style={styles.footerButton}>
              <Button
                title={translation.signup_button}
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
    padding: SIZES.H10, //10,
    width: '100%',
    backgroundColor: 'transparent',
    height: screenHeight * 0.4,
  },
  bigCard: {
    width: '100%',
    padding: SIZES.H10, //10,
    paddingBottom: 0,
    backgroundColor: 'transparent',
    height: 639 + 17,
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
    paddingRight: SIZES.H8, //8,
    paddingLeft: SIZES.H10, //10,
    paddingVertical: SIZES.V12, //12,
  },
  body: {
    flex: 1,
    marginTop: SIZES.V45, //45,
    paddingHorizontal: SIZES.H15 * 2, //30,
  },
  mainBody: {
    flex: 1,
    marginTop: SIZES.V12 * 2, //24,
    paddingHorizontal: SIZES.H15 * 2, //30,
  },
  subBody: {
    flex: 1,
    marginTop: SIZES.V8, //8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerTitle: {
    color: COLORS.Primary_Link,
    marginLeft: SIZES.H12, //12,
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
