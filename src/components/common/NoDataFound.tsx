import React, {FC, memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IMAGES} from '~constants';
import {useTranslations} from '~translation';
import {COLORS, FONTS, fontSize, screenHeight, SIZES} from '~styles';

interface Props {
  title?: string;
}

const NoDataFound: FC<Props> = ({title}) => {
  const {translation} = useTranslations();

  return (
    <View style={styles.container}>
      <Image source={IMAGES.NoData} style={styles.logo} />
      <Text style={styles.title}>{title ? title : translation.no_data}</Text>
    </View>
  );
};

export default memo(NoDataFound);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: screenHeight * 0.1,
  },
  logo: {
    width: screenHeight * 0.4,
    height: screenHeight * 0.4,
    backgroundColor: COLORS.Primary_Background[0],
    resizeMode: 'contain',
  },
  title: {
    fontSize: fontSize(14),
    fontWeight: '700',
    fontFamily: FONTS.Primary_Bold,
    color: COLORS.Primary_Link,
    marginVertical: SIZES.V10,
  },
});
