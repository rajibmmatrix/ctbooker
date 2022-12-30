import React, {FC} from 'react';
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import {IMAGES} from '~constants';
import {COLORS, isIOS} from '~styles';

const CustomBottom: FC = () => {
  return (
    <View style={[styles.main, isIOS && styles.subMain]}>
      <Image
        source={IMAGES.Tabbar}
        style={[styles.image, isIOS && styles.subImage]}
      />
    </View>
  );
};

export default CustomBottom;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.Primary_Background[0],
  },
  subMain: {
    height: 70,
    justifyContent: 'flex-end',
  },
  image: {
    width: Dimensions.get('window').width,
  },
  subImage: {
    height: 70,
    resizeMode: 'stretch',
  },
});
