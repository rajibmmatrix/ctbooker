import React, {FC, memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SvgProps} from 'react-native-svg';
import {useTranslations} from '~translation';
import {Icons} from '~constants';
import {COLORS, FONTS, _styles} from '~styles';

interface Props {
  Icon: FC<SvgProps>;
  title: string;
  onPress?: () => void;
}

const BookingFileUpload: FC<Props> = ({Icon, title, onPress}) => {
  const translations = useTranslations();

  return (
    <View style={styles.container}>
      <View style={_styles.rowCenter}>
        <Icon width={20} height={20} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Icons.DirectSend />
        <Text style={styles.buttonTitle}>{translations.attachments}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(BookingFileUpload);

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    borderBottomWidth: 1,
    marginTop: 10,
    borderBottomColor: COLORS.Primary_Line,
  },
  title: {
    width: '62%',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 15,
    fontFamily: FONTS.Secondary_Regular,
    color: COLORS.Primary_Placeholder,
    paddingLeft: 7,
  },
  button: {
    height: 30,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.Buttons[0],
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16,
    fontFamily: FONTS.Secondary_Medium,
    color: COLORS.Light,
    paddingLeft: 4,
  },
});
