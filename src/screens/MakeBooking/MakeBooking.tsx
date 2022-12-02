import React, {useLayoutEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, TextInput} from 'react-native';
import {
  BackHeader,
  BookingFileUpload,
  BookingIconTitle,
  Container,
  DateTimePicker,
  RadioButton,
} from '~components';
import {useTranslations} from '~translation';
import {SideScreenProps} from 'types';
import {Icons} from '~constants';
import {COLORS, FONTS} from '~styles';

export default function MakeBookingScreen({
  route,
}: SideScreenProps<'MakeBooking'>) {
  const {type} = route.params;
  const translations = useTranslations();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [showDateTime, setShowDateTime] = useState<boolean>(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');

  useLayoutEffect(() => {
    if (type === 'Technical Control') {
      setTitle(translations.technical_control_title);
    } else if (type === 'Against Visit') {
      setTitle(translations.against_visit_title);
    } else {
      setTitle(translations.car_repair_title);
    }
    return () => setTitle('');
  }, [type, translations]);

  const handelDate = (_: any, value: Date) => {
    const currentDate = value;
    setDate(currentDate);
    setShowDateTime(false);
  };

  return (
    <Container>
      <BackHeader title={title} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <BookingIconTitle
          title={translations.date_of_reservition}
          placeholder={translations.date}
          value={date?.toLocaleDateString()}
          Icon={Icons.Calendar}
          disabled={true}
          onPress={() => {
            setShowDateTime(true);
            setMode('date');
          }}
        />
        <BookingIconTitle
          placeholder={translations.pickup_time}
          value={date?.toLocaleTimeString()}
          Icon={Icons.Clock}
          disabled={true}
          onPress={() => {
            setShowDateTime(true);
            setMode('time');
          }}
        />
        <BookingIconTitle
          value={translations.pickup_location}
          Icon={Icons.Location}
        />
        <RadioButton
          title={translations.deposit_same_place}
          isSelected={true}
          onPress={() => {}}
          style={styles.radioButton}
        />
        <RadioButton
          title={translations.different_deposit_location}
          isSelected={false}
          onPress={() => {}}
          style={styles.radioButton}
        />
        <BookingIconTitle
          placeholder={translations.deposit_address}
          Icon={Icons.Routing}
        />
        {type === 'Car Repair' ? (
          <>
            <View style={styles.inputContainer}>
              <Icons.NoteText />
              <TextInput
                placeholder={translations.vehicle_problem}
                numberOfLines={4}
              />
            </View>
            <Text style={[styles.input, styles.placeHolder]}>
              {translations.max_characters}
            </Text>
          </>
        ) : (
          <Text style={styles.title}>{translations.price}</Text>
        )}
        <BookingFileUpload
          Icon={Icons.ShieldTick}
          title={translations.insurance_card_number}
        />
        <BookingFileUpload
          Icon={Icons.CalendarTick}
          title={translations.gray_card}
        />
        <BookingFileUpload
          Icon={Icons.CPU}
          title={translations.valid_technical_control}
        />
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>{translations.next}</Text>
        </View>
        <RadioButton
          title={translations.termes_and_conditions}
          isSelected={false}
          onPress={() => {}}
          style={styles.footer}
        />
        <DateTimePicker
          show={showDateTime}
          mode={mode}
          onChange={handelDate}
          value={date}
        />
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 30,
  },
  radioButton: {
    marginLeft: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16,
    fontFamily: FONTS.Secondary_Medium,
    color: COLORS.Light,
    marginTop: 10,
  },
  inputContainer: {
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.Primary_Line,
  },
  input: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    marginLeft: 11,
    fontFamily: FONTS.Secondary_Regular,
    color: COLORS.Primary_Placeholder,
  },
  button: {
    width: 180,
    height: 50,
    marginTop: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.Primary,
    borderRadius: 100,
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
    fontFamily: FONTS.Secondary_Bold,
    textTransform: 'uppercase',
    color: COLORS.Light,
  },
  footer: {
    marginTop: 20,
    alignSelf: 'center',
  },
  placeHolder: {
    marginTop: 14,
    marginLeft: 0,
  },
});
