import React, {FC, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icons} from '~constants';
import {COLORS, FONTS} from '~styles';
import {useTranslations} from '~translation';

interface Props {
  date: string;
  type: string;
  details: string;
  onPress?: () => void;
}

const BookingCard: FC<Props> = ({date, type, details, onPress}) => {
  const translation = useTranslations();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={styles.container}>
      <View style={styles.body}>
        <Icons.Calendar width={26} height={26} />
        <Text style={styles.title}>{date}</Text>
      </View>
      <View style={styles.body}>
        <Icons.Book width={26} height={27} />
        <Text style={styles.title}>
          {translation.service_type}: {type}
        </Text>
      </View>
      <View style={styles.body}>
        <Icons.SmallCar width={24} height={24} color={COLORS.Light} />
        <Text style={styles.title}>
          {translation.car_details}: {details}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(BookingCard);

const styles = StyleSheet.create({
  container: {
    paddingTop: 11,
    marginLeft: 15,
    marginRight: 20,
    marginBottom: 27,
    paddingBottom: 18,
    paddingHorizontal: 22,
    borderRadius: 15,
    backgroundColor: COLORS.Primary_Card,
    shadowColor: COLORS.Dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  body: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    fontFamily: FONTS.Secondary_Medium,
    lineHeight: 18,
    color: COLORS.Light,
    marginLeft: 15,
  },
});
