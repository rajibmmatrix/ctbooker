import React, {FC} from 'react';
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import {IMAGES} from '~constants';
import {COLORS} from '~styles';

const CustomBottom: FC = () => {
  return (
    <View style={styles.main}>
      <Image source={IMAGES.Tabbar} style={styles.image} />
    </View>
  );
};

export default CustomBottom;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.Primary_Background[0],
  },
  image: {
    width: Dimensions.get('window').width,
  },
});
