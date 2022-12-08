import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {BookingButton, Container, HomeHeader} from '~components';
import {Icons, IMAGES} from '~constants';
import {COLORS, FONTS, fontSize, screenHeight, SIZES} from '~styles';
import {useTranslations} from '~translation';
import {TabScreenProps} from 'types';

export default function BookingScreen({navigation}: TabScreenProps<'Booking'>) {
  const {translation} = useTranslations();

  return (
    <Container>
      <HomeHeader title={translation.booking_title} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{translation.type_of_service}</Text>
          <Image source={IMAGES.Booking} style={styles.image} />
        </View>
        <View style={styles.body}>
          <BookingButton
            title={translation.technical_control}
            color={COLORS.Buttons[0]}
            onPress={() =>
              navigation.navigate('MakeBooking', {type: 'Technical Control'})
            }
            Icon={Icons.CpuSetting}
          />
          <BookingButton
            title={translation.against_visit}
            color={COLORS.Buttons[1]}
            onPress={() =>
              navigation.navigate('MakeBooking', {type: 'Against Visit'})
            }
            Icon={Icons.DriverRefresh}
          />
          <BookingButton
            title={translation.car_repair}
            color={COLORS.Buttons[2]}
            onPress={() =>
              navigation.navigate('MakeBooking', {type: 'Car Repair'})
            }
            Icon={Icons.Car}
          />
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.H15 * 2, //30,
  },
  header: {
    marginTop: 34,
  },
  title: {
    fontSize: fontSize(13),
    fontWeight: '700',
    fontFamily: FONTS.Primary_Bold,
    color: COLORS.Light,
  },
  image: {
    height: screenHeight * 0.3,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: -13,
  },
  body: {
    marginTop: 27,
    paddingHorizontal: 26,
  },
});
