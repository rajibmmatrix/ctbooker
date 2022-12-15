import React, {FC, memo} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {Button} from '~common';
import {
  COLORS,
  FONTS,
  fontSize,
  screenHeight,
  screenWidth,
  SIZES,
} from '~styles';

interface Props {
  show: boolean;
  onPress: () => void;
  isForLang: boolean;
}

const UpdateModal: FC<Props> = ({show, onPress, isForLang}) => {
  const title = isForLang ? 'Sync' : 'Update';
  const description = isForLang
    ? 'Your app texts are outdated. Please sync to continue.'
    : 'Your app is outdated. Please update to continue.';

  return (
    <Modal transparent visible={show} style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Button
            title={title}
            onPress={onPress}
            style={styles.button}
            textStyle={styles.buttonTitle}
          />
        </View>
      </View>
    </Modal>
  );
};

export default memo(UpdateModal);

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000bf', //COLORS.Primary_Modal,
  },
  card: {
    borderRadius: 10,
    width: screenWidth * 0.6,
    paddingVertical: SIZES.V22,
    paddingHorizontal: SIZES.H15,
    backgroundColor: COLORS.Primary_Background[0],
  },
  title: {
    fontSize: fontSize(18),
    fontWeight: '700',
    fontFamily: FONTS.Primary_Bold,
    textAlign: 'center',
    color: COLORS.Light,
  },
  description: {
    fontSize: fontSize(15),
    fontWeight: '500',
    fontFamily: FONTS.Primary_Medium,
    textAlign: 'center',
    color: COLORS.Light,
    marginTop: SIZES.V22,
  },
  button: {
    height: 40,
    width: 120,
    marginTop: SIZES.V22,
    alignSelf: 'center',
  },
  buttonTitle: {
    textTransform: 'capitalize',
  },
});
