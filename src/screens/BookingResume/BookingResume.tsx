import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {BackHeader, BookingCard, Container} from '~components';
import {SideScreenProps} from 'types';
import {useTranslations} from '~translation';

export default function BookingResumeScreen({}: SideScreenProps<'BookingResume'>) {
  const translation = useTranslations();

  const data = [
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
  ];

  return (
    <Container>
      <BackHeader title={translation.booking_history} />
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <BookingCard
              date={item.date}
              type={item.type}
              details={item.details}
            />
          )}
          keyExtractor={(_, index) => index.toString()}
          style={styles.body}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  body: {
    flex: 1,
  },
});
