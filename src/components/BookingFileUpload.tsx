import React, {FC, memo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import type {Asset} from 'react-native-image-picker';
import type {SvgProps} from 'react-native-svg';
import {ImagePicker} from '~common';
import {Icons} from '~constants';
import {useTranslations} from '~translation';
import {COLORS, FONTS, fontSize, SIZES, _styles} from '~styles';

interface Props {
  Icon: FC<SvgProps>;
  title: string;
  onChose: (image: Asset) => void;
}

const BookingFileUpload: FC<Props> = ({Icon, title, onChose}) => {
  const {translation} = useTranslations();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <View style={_styles.rowCenter}>
          <Icon width={20} height={20} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          style={styles.button}>
          <Icons.DirectSend />
          <Text style={styles.buttonTitle}>{translation.attachments}</Text>
        </TouchableOpacity>
      </View>
      <ImagePicker
        title={title}
        show={showPicker}
        onChose={onChose}
        onClose={() => setShowPicker(false)}
      />
    </>
  );
};

export default memo(BookingFileUpload);

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginTop: SIZES.V10, //10,
    paddingLeft: SIZES.H8 * 2, //16,
    borderBottomColor: COLORS.Primary_Line,
  },
  title: {
    width: 135,
    fontSize: fontSize(14),
    fontWeight: '400',
    lineHeight: 15,
    fontFamily: FONTS.Secondary_Regular,
    color: COLORS.Primary_Placeholder,
    paddingLeft: SIZES.H7, //7,
  },
  button: {
    height: 30,
    minWidth: 115,
    paddingHorizontal: SIZES.H3 * 2, //6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.Buttons[0],
  },
  buttonTitle: {
    fontSize: fontSize(14),
    fontWeight: '500',
    lineHeight: 16,
    fontFamily: FONTS.Secondary_Medium,
    color: COLORS.Light,
    paddingLeft: SIZES.H2 * 2, //4,
  },
});
