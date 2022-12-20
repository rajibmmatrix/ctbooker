import React, {useLayoutEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  BackHeader,
  BookingFileUpload,
  BookingIconTitle,
  Container,
  DateTimePicker,
  RadioButton,
  Calendars,
} from '~components';
import {useTranslations} from '~translation';
import {Icons} from '~constants';
import {COLORS, FONTS, fontSize, SIZES} from '~styles';
import {loading, useDispatch} from '~app';
import {SideScreenProps} from 'types';

export default function MakeBookingScreen({
  navigation,
  route,
}: SideScreenProps<'MakeBooking'>) {
  const {type} = route.params;
  const dispatch = useDispatch();
  const {translation} = useTranslations();

  const [title, setTitle] = useState('');
  const [showTime, setShowTime] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [isTCSelected, setIsTCSelected] = useState<boolean>(false);
  const [form, setForm] = useState<any>({
    date: null,
    time: null,
  });

  useLayoutEffect(() => {
    if (type === 'Technical Control') {
      setTitle(translation.technical_control_title);
    } else if (type === 'Against Visit') {
      setTitle(translation.against_visit_title);
    } else {
      setTitle(translation.car_repair_title);
    }
    return () => setTitle('');
  }, [type, translation]);

  const handelTime = (_: any, value: Date) => {
    setForm((prev: any) => ({...prev, time: value}));
    setShowTime(false);
  };

  return (
    <Container>
      <BackHeader title={title} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <BookingIconTitle
          title={translation.date_of_reservition}
          placeholder={translation.date}
          value={form.date?.toLocaleDateString()}
          Icon={Icons.Calendar}
          disabled={true}
          onPress={() => setShowCalendar(true)}
        />
        <BookingIconTitle
          placeholder={translation.pickup_time}
          value={form.time?.toLocaleTimeString()}
          Icon={Icons.Clock}
          disabled={true}
          onPress={() => setShowTime(true)}
        />
        <BookingIconTitle
          value={translation.pickup_location}
          Icon={Icons.Location}
        />
        <RadioButton
          title={translation.deposit_same_place}
          isSelected={true}
          onPress={() => {}}
          style={styles.radioButton}
        />
        <RadioButton
          title={translation.different_deposit_location}
          isSelected={false}
          onPress={() => {}}
          style={styles.radioButton}
        />
        <BookingIconTitle
          placeholder={translation.deposit_address}
          Icon={Icons.Routing}
        />
        {type === 'Car Repair' ? (
          <>
            <View style={styles.inputContainer}>
              <Icons.NoteText />
              <TextInput
                placeholder={translation.vehicle_problem}
                placeholderTextColor={COLORS.Secondary_Text}
                numberOfLines={4}
                style={[styles.input, styles.inputBox]}
              />
            </View>
            <Text style={[styles.input, styles.placeHolder]}>
              {translation.max_characters}
            </Text>
          </>
        ) : (
          <Text style={styles.title}>
            {translation.price}: 80 euros{' '}
            {type === 'Technical Control'
              ? '( contrôle technique inclus)'
              : null}
          </Text>
        )}
        <BookingFileUpload
          Icon={Icons.ShieldTick}
          title={translation.insurance_card_number}
        />
        <BookingFileUpload
          Icon={Icons.CalendarTick}
          title={translation.gray_card}
        />
        <BookingFileUpload
          Icon={Icons.CPU}
          title={translation.valid_technical_control}
        />
        <TouchableOpacity
          onPress={() => {
            dispatch(loading(true));
            setTimeout(() => {
              dispatch(loading(false));
              navigation.navigate('Tab', {screen: 'Booking'});
            }, 1500);
          }}
          style={styles.button}>
          <Text style={styles.buttonTitle}>{translation.next}</Text>
        </TouchableOpacity>
        <RadioButton
          title={translation.termes_and_conditions}
          isSelected={isTCSelected}
          onPress={() => setIsTCSelected(prev => !prev)}
          style={styles.footer}
        />
        <DateTimePicker
          show={showTime}
          mode="time"
          onChange={handelTime}
          value={form.time}
        />
        <Calendars
          show={showCalendar}
          onDayPress={(e: any) => {
            console.log(e);
            setShowCalendar(false);
          }}
          onClose={() => {
            setShowCalendar(false);
          }}
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
    fontSize: fontSize(14),
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
    fontSize: fontSize(14),
    fontWeight: '400',
    lineHeight: 16,
    marginLeft: 11,
    fontFamily: FONTS.Secondary_Regular,
    color: COLORS.Primary_Placeholder,
  },
  inputBox: {flex: 1},
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
    fontSize: fontSize(14),
    fontWeight: '700',
    lineHeight: 16,
    fontFamily: FONTS.Secondary_Bold,
    textTransform: 'uppercase',
    color: COLORS.Light,
  },
  footer: {
    marginTop: SIZES.V22, //22,
    marginBottom: SIZES.V38, //38,
    alignSelf: 'center',
  },
  placeHolder: {
    marginTop: 14,
    marginLeft: 0,
  },
});
