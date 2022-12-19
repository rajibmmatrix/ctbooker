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
import {useTranslations} from '~translation';
import {signup, loading, useDispatch} from '~app';
import {COLORS, FONTS, screenHeight, SIZES, _styles} from '~styles';
import {showToaster} from '~utils';

interface Props {
  onMove: () => void;
  showSignup: () => void;
}

type ITabs = 'individual' | 'profesonal' | null;

interface INPUT {
  first_name?: string;
  last_name?: string;
  company_name?: string;
  crn?: string;
  email: string;
  password: string;
}

const fdata = {
  first_name: '',
  last_name: '',
  company_name: '',
  crn: '',
  email: '',
  password: '',
};

const errors = {
  first_name: false,
  last_name: false,
  company_name: false,
  crn: false,
  email: false,
  password: false,
};

const SignupScreen: FC<Props> = ({onMove, showSignup}) => {
  const dispatch = useDispatch();
  const {translation} = useTranslations();
  const [tabs, setTabs] = useState<ITabs>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [form, setForm] = useState<INPUT>({...fdata});
  const [error, setError] = useState({...errors});

  const checkValidation = async () => {
    let status = false;
    let isEmailValide = true;
    let isPasswordValide = true;
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    let isError = {...errors};
    setError(isError);
    if (tabs === 'individual' && !form?.first_name?.trim()) {
      status = true;
      isError.first_name = true;
    }
    if (tabs === 'individual' && !form?.last_name?.trim()) {
      status = true;
      isError.last_name = true;
    }
    if (tabs === 'profesonal' && !form?.company_name?.trim()) {
      status = true;
      isError.company_name = true;
    }
    if (tabs === 'profesonal' && !form?.crn?.trim()) {
      status = true;
      isError.crn = true;
    }
    if (!form.email.trim()) {
      status = true;
      isError.email = true;
    } else if (!reg.test(form.email)) {
      status = true;
      isEmailValide = false;
      isError.email = true;
    }
    if (!form.password.trim()) {
      status = true;
      isError.password = true;
    } else if (form.password.trim().length < 8) {
      status = true;
      isError.password = true;
      isPasswordValide = false;
    }
    setError(isError);
    return {status, isEmailValide, isPasswordValide};
  };

  const handleSignup = async () => {
    const {status, isEmailValide, isPasswordValide} = await checkValidation();
    if (status) {
      return showToaster(
        !isEmailValide
          ? translation.enter_email
          : !isPasswordValide
          ? translation.password_error
          : translation.signup_error,
        'error',
      );
    }
    let params = {...form, customer_type: tabs === 'individual' ? '0' : '1'};
    if (tabs === 'individual') {
      delete params.company_name;
      delete params.crn;
    } else if (tabs === 'profesonal') {
      delete params.first_name;
      delete params.last_name;
    }
    dispatch(loading(true));
    dispatch(signup(params))
      .unwrap()
      .then(() => onMove())
      .catch(() => {})
      .finally(() => dispatch(loading(false)));
  };

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
            {tabs === 'individual' ? (
              <>
                <Input
                  title={translation.fname}
                  Icon={Icons.User}
                  placeholder={translation.fname}
                  onChangeText={(e: string) => {
                    setForm(prev => ({...prev, first_name: e}));
                  }}
                  value={form.first_name}
                  error={error.first_name}
                />
                <Input
                  title={translation.lname}
                  Icon={Icons.User}
                  placeholder={translation.lname}
                  onChangeText={(e: string) => {
                    setForm(prev => ({...prev, last_name: e}));
                  }}
                  value={form.last_name}
                  error={error.last_name}
                />
              </>
            ) : (
              <>
                <Input
                  title={translation.company_name}
                  Icon={Icons.User}
                  placeholder={translation.company_name}
                  onChangeText={(e: string) => {
                    setForm(prev => ({...prev, company_name: e}));
                  }}
                  value={form.company_name}
                  error={!!error.company_name}
                />
                <Input
                  title="CRN"
                  Icon={Icons.User}
                  placeholder="CRN"
                  onChangeText={(e: string) => {
                    setForm(prev => ({...prev, crn: e}));
                  }}
                  value={form.crn}
                  error={error.crn}
                />
              </>
            )}
            <Input
              title={translation.email}
              Icon={Icons.SMS}
              placeholder={translation.email}
              autoComplete="email"
              autoCapitalize="none"
              onChangeText={(e: string) => {
                setForm(prev => ({...prev, email: e}));
              }}
              value={form.email}
              error={error.email}
            />
            <Input
              title={translation.password}
              Icon={Icons.Lock}
              placeholder={translation.password}
              secureTextEntry={true}
              onChangeText={(e: string) => {
                setForm(prev => ({...prev, password: e}));
              }}
              value={form.password}
              error={error.password}
            />
            <TouchableOpacity onPress={() => setIsSelected(prev => !prev)}>
              <View style={styles.footer}>
                <View
                  style={isSelected ? styles.selected : styles.unSelected}
                />
                <Text style={[_styles.link, styles.footerTitle]}>
                  {translation.termes_and_conditions}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.footerButton}>
              <Button
                title={translation.signup_button}
                disabled={!isSelected}
                onPress={handleSignup}
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
    paddingBottom: 0,
    backgroundColor: 'transparent',
    minHeight: screenHeight * 0.37,
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
