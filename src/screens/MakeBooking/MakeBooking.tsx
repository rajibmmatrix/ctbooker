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
import {Icons} from '~constants';
import {useTranslations} from '~translation';
import {loading, useDispatch} from '~app';
import {COLORS, FONTS, fontSize, SIZES} from '~styles';
import {ICBooking, SideScreenProps} from 'types';

const params: ICBooking = {
  booking_type: '',
  datetime: null,
  pickuptime: null,
  pickup_address: '',
  drop_address: '',
  same_address: false,
  terms_conditions_verified: false,
};

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
  const [form, setForm] = useState<ICBooking>(params);

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

  return (
    <Container>
      <BackHeader title={title} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <BookingIconTitle
          Icon={Icons.Calendar}
          title={translation.date_of_reservition}
          placeholder={translation.date}
          value={form.datetime as string}
          onPress={() => setShowCalendar(true)}
          disabled={true}
        />
        <BookingIconTitle
          Icon={Icons.Clock}
          placeholder={translation.pickup_time}
          value={form.pickuptime?.toLocaleTimeString()}
          onPress={() => setShowTime(true)}
          disabled={true}
        />
        <BookingIconTitle
          Icon={Icons.Location}
          placeholder={translation.pickup_location}
          onChangeText={e => setForm(prev => ({...prev, pickup_address: e}))}
          value={form.pickup_address}
        />
        <RadioButton
          title={translation.deposit_same_place}
          isSelected={form.same_address}
          onPress={() => {
            setForm(prev => ({
              ...prev,
              same_address: true,
              drop_address: prev.pickup_address,
            }));
          }}
          style={styles.radioButton}
        />
        <RadioButton
          title={translation.different_deposit_location}
          isSelected={!form.same_address}
          onPress={() => setForm(prev => ({...prev, same_address: false}))}
          style={styles.radioButton}
        />
        <BookingIconTitle
          Icon={Icons.Routing}
          placeholder={translation.deposit_address}
          onChangeText={e => setForm(prev => ({...prev, drop_address: e}))}
          value={form.drop_address}
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
          isSelected={form.terms_conditions_verified}
          onPress={() => {
            setForm(prev => ({
              ...prev,
              terms_conditions_verified: !prev.terms_conditions_verified,
            }));
          }}
          style={styles.footer}
        />
        <DateTimePicker
          show={showTime}
          mode="time"
          onChange={(value: Date) => {
            setForm(prev => ({...prev, pickuptime: value}));
            setShowTime(false);
          }}
          onCancel={() => setShowTime(false)}
          value={form.pickuptime}
        />
        <Calendars
          initialDate={form.datetime as string}
          show={showCalendar}
          onDayPress={(e: any) => {
            setForm(prev => ({...prev, datetime: e.dateString}));
            setShowCalendar(false);
          }}
          onClose={() => setShowCalendar(false)}
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
    minHeight: 90,
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
