import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {BackHeader, BookingCard, Container, NoDataFound} from '~components';
import {useTranslations} from '~translation';
import {getBookings, loading, useDispatch, useSelector} from '~app';
import {SIZES} from '~styles';
import {SideScreenProps} from 'types';

export default function BookingResumeScreen({}: SideScreenProps<'BookingResume'>) {
  const dispatch = useDispatch();
  const {translation} = useTranslations();

  const {bookings} = useSelector(state => state.booking);

  useEffect(() => {
    dispatch(loading(true));
    dispatch(getBookings()).finally(() => dispatch(loading(false)));

    return () => {};
  }, [dispatch]);

  /* const data = [
    {
      date: '23.11.2022',
      type: translation.technical_control,
      details: 'Mauris eu risus felis. Integer',
    },
    {
      date: '30.11.2022',
      type: translation.against_visit,
      details: 'Mauris eu risus felis. Integer',
    },
    {
      date: '02.12.2022',
      type: translation.technical_control,
      details: 'Mauris eu risus felis. Integer',
    },
  ]; */

  return (
    <Container>
      <BackHeader title={translation.booking_history} />
      {bookings.length ? (
        <View style={styles.container}>
          <FlatList
            data={bookings}
            renderItem={({item}) => (
              <BookingCard
                date={item?.datetime?.toLocaleString()!}
                type={
                  item?.booking_type === 'technical'
                    ? translation.technical_control
                    : item?.booking_type === 'control'
                    ? translation.against_visit
                    : translation.car_repair
                }
                details={item?.pickup_address}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
            style={styles.body}
          />
        </View>
      ) : (
        <NoDataFound />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SIZES.V10, //10,
  },
  body: {
    flex: 1,
  },
});
