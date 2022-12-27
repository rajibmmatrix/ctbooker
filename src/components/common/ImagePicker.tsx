import React, {FC, memo} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {IMAGES} from '~constants';
import {COLORS, FONTS, fontSize, SIZES, _styles} from '~styles';
import {showToaster} from '~utils';

interface Props {
  show: boolean;
  title?: string;
  onClose: () => void;
  onChose: (image: Asset) => void;
}

const ImagePicker: FC<Props> = ({show = false, title, onClose, onChose}) => {
  const handelCamera = async () => {
    try {
      const data = await launchCamera({
        includeBase64: true,
        mediaType: 'photo',
        cameraType: 'front',
        saveToPhotos: true,
        maxHeight: 200,
        maxWidth: 200,
        quality: 0,
      });
      if (data.assets?.length) {
        onChose(data.assets[0]);
        onClose();
      }
    } catch (error: any) {
      showToaster(error.message, 'error');
    }
  };

  const handelGallery = async () => {
    try {
      const data = await launchImageLibrary({
        includeBase64: true,
        mediaType: 'photo',
        selectionLimit: 1,
        maxHeight: 200,
        maxWidth: 200,
        quality: 0,
      });
      if (data.assets?.length) {
        onChose(data.assets[0]);
        onClose();
      }
    } catch (error: any) {
      showToaster(error.message, 'error');
    }
  };

  return (
    <Modal
      visible={show}
      transparent
      style={_styles.container}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{title ? title : 'Profile Photo'}</Text>
          <View style={styles.body}>
            <TouchableOpacity onPress={handelCamera}>
              <Image source={IMAGES.Camera} style={styles.image} />
              <Text style={styles.description}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handelGallery}>
              <Image source={IMAGES.Gallery} style={styles.image} />
              <Text style={styles.description}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <Image source={IMAGES.Close} style={styles.image} />
              <Text style={styles.description}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(ImagePicker);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Primary_Modal,
    justifyContent: 'flex-end',
  },
  content: {
    minHeight: 180,
    padding: SIZES.H10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: COLORS.Primary_Card,
  },
  title: {
    fontSize: fontSize(14),
    fontWeight: '700',
    fontFamily: FONTS.Primary_Bold,
    color: COLORS.Primary_Link,
    textAlign: 'center',
    marginTop: SIZES.V10 / 2,
  },
  body: {
    marginTop: SIZES.V12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  description: {
    fontSize: fontSize(12),
    fontWeight: '400',
    fontFamily: FONTS.Secondary_Regular,
    color: COLORS.Primary_Link,
    textAlign: 'center',
    marginTop: SIZES.V3,
  },
});
