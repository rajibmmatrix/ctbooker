import React, {FC, memo} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icons} from '~constants';
import {COLORS, FONTS, fontSize, SIZES} from '~styles';

interface Props {
  title: string;
  style?: ViewStyle;
}

const BackHeader: FC<Props> = ({title, style}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.header, style]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icons.ArrowLeft />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default memo(BackHeader);

const styles = StyleSheet.create({
  header: {
    padding: SIZES.H10 * 2, //20,
    paddingTop: SIZES.V10, // 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: fontSize(18),
    fontWeight: '500',
    lineHeight: 21,
    fontFamily: FONTS.Secondary_Medium,
    color: COLORS.Light,
    marginLeft: 33,
  },
});
