import React, {FC} from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {Calendar, LocaleConfig, CalendarProps} from 'react-native-calendars';
import {Icons} from '~constants';
import {COLORS, FONTS, fontSize} from '~styles';
import {useTranslations} from '~translation';

interface Props extends CalendarProps {
  show: boolean;
  onClose: () => void;
}

const Calendars: FC<Props> = ({show, onClose, onDayPress, ...props}) => {
  const {type} = useTranslations();
  LocaleConfig.locales.fr = {
    monthNames: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ],
    monthNamesShort: [
      'Janv.',
      'Févr.',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juil.',
      'Août',
      'Sept.',
      'Oct.',
      'Nov.',
      'Déc.',
    ],
    dayNames: [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
    ],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: "Aujourd'hui",
  };

  LocaleConfig.defaultLocale = type;

  return (
    <Modal visible={show} onRequestClose={onClose} transparent={true}>
      <View style={styles.container}>
        <Calendar
          hideExtraDays={true}
          monthFormat={'d MMMM yyyy'}
          onDayPress={onDayPress}
          enableSwipeMonths={true}
          renderArrow={direction =>
            direction === 'left' ? (
              <Icons.CLeft width={24} height={24} />
            ) : (
              <Icons.CRight width={24} height={24} />
            )
          }
          style={styles.calendar}
          theme={styles.theme as unknown as undefined}
          {...props}
        />
      </View>
    </Modal>
  );
};

export default Calendars;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 131,
    paddingHorizontal: 35,
    backgroundColor: COLORS.Primary_Modal,
  },
  calendar: {
    height: 380,
    backgroundColor: COLORS.Primary_Card,
    borderRadius: 43,
  },
  theme: {
    backgroundColor: COLORS.Primary_Card,
    calendarBackground: COLORS.Primary_Card,
    textSectionTitleColor: COLORS.Light,
    todayTextColor: COLORS.Primary_Gradient[2],
    selectedDayBackgroundColor: COLORS.Primary_Gradient[2],
    selectedDayTextColor: COLORS.Others[0],
    dayTextColor: COLORS.Others[0],
    textDisabledColor: COLORS.Primary_Placeholder,
    arrowColor: COLORS.Others[0],
    disabledArrowColor: COLORS.Gray,
    monthTextColor: COLORS.Others[1],
    indicatorColor: 'blue',
    textDayFontFamily: FONTS.Secondary_Regular,
    textMonthFontFamily: FONTS.Secondary_Medium,
    textDayHeaderFontFamily: FONTS.Secondary_Regular,
    textDayFontWeight: '400',
    textMonthFontWeight: '500',
    textDayHeaderFontWeight: '400',
    textDayFontSize: fontSize(16),
    textMonthFontSize: fontSize(14),
    textDayHeaderFontSize: fontSize(9),
  },
});
