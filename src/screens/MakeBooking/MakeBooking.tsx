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
import {addBooking, loading, useDispatch} from '~app';
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
  insurance_attachment: '',
  graycard_attachment: '',
  techcontrol_attachment: '',
  pickup_latitude: '22.489810',
  pickup_longitude: '88.336110',
  drop_latitude: '22.489810',
  drop_longitude: '88.336110',
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
      setForm(prev => ({...prev, booking_type: 'technical'}));
    } else if (type === 'Against Visit') {
      setTitle(translation.against_visit_title);
      setForm(prev => ({...prev, booking_type: 'control'}));
    } else {
      setTitle(translation.car_repair_title);
      setForm(prev => ({...prev, booking_type: 'repair'}));
    }
    return () => setTitle('');
  }, [type, translation]);

  const handleAddBooking = () => {
    let formData = new FormData();
    formData.append('booking_type', form.booking_type);
    formData.append('datetime', form.datetime);
    formData.append('pickuptime', form.pickuptime);
    formData.append('pickup_address', form.pickup_address);
    formData.append('pickup_latitude', form.pickup_latitude);
    formData.append('pickup_longitude', form.pickup_longitude);
    formData.append('drop_address', form.drop_address);
    formData.append('drop_latitude', form.drop_latitude);
    formData.append('drop_longitude', form.drop_longitude);
    formData.append('same_address', form.same_address);
    formData.append('insurance_attachment', form.insurance_attachment);
    formData.append('graycard_attachment', form.graycard_attachment);
    formData.append('techcontrol_attachment', form.techcontrol_attachment);
    formData.append(
      'terms_conditions_verified',
      form.terms_conditions_verified,
    );

    dispatch(loading(true));
    dispatch(addBooking(form))
      .unwrap()
      .then(() => {
        navigation.navigate('Tab', {screen: 'Booking'});
      })
      .finally(() => dispatch(loading(false)));
  };

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
          onChose={image => {
            setForm(prev => ({...prev, insurance_attachment: image?.base64!}));
          }}
        />
        <BookingFileUpload
          Icon={Icons.CalendarTick}
          title={translation.gray_card}
          onChose={image => {
            setForm(prev => ({...prev, graycard_attachment: image?.base64!}));
          }}
        />
        <BookingFileUpload
          Icon={Icons.CPU}
          title={translation.valid_technical_control}
          onChose={image => {
            setForm(prev => ({
              ...prev,
              techcontrol_attachment: image?.base64!,
            }));
          }}
        />
        <TouchableOpacity onPress={handleAddBooking} style={styles.button}>
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
