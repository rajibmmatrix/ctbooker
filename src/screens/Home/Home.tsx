import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {HomeHeader, Container} from '~components';
import {Icons, IMAGES} from '~constants';
import {COLORS, FONTS} from '~styles';
import {useTranslations} from '~translation';
import {TabScreenProps} from 'types';

export default function HomeScreen({navigation}: TabScreenProps<'Home'>) {
  const translations = useTranslations();

  return (
    <Container>
      <HomeHeader title={translations.home_title} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Image source={IMAGES.Banner} style={styles.banner} />
        <Text style={styles.title}>{translations.home_description}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Booking')}
          style={styles.button}>
          <Icons.Clipboard height={73} width={72} />
          <Text style={styles.buttonTitle}>{translations.booking}</Text>
        </TouchableOpacity>
        <Image source={IMAGES.Offer} style={styles.offer} />
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  banner: {
    height: 132,
    width: '100%',
    resizeMode: 'cover',
    alignSelf: 'center',
    marginTop: 25,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: COLORS.Primary_Border,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: FONTS.Primary_Bold,
    color: COLORS.Light,
    marginVertical: 20,
  },
  button: {
    height: 205,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.Buttons[0],
    borderRadius: 22,
  },
  buttonTitle: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: FONTS.Primary_Bold,
    color: COLORS.Light,
    textAlign: 'center',
    marginTop: 18,
  },
  offer: {
    height: 232,
    width: '100%',
    alignSelf: 'center',
    marginTop: 27,
    borderWidth: 1,
    borderRadius: 22,
    borderColor: COLORS.Primary_Border,
  },
});
