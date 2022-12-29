import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, ImagePicker} from '~common';
import {COLORS, FONTS, fontSize} from '~styles';
//import {useTranslations} from '~translation';
import {editProfilePic, loading, useDispatch} from '~app';
import {TabScreenProps} from 'types';

export default function AccountScreen({}: TabScreenProps<'Account'>) {
  const dispatch = useDispatch();
  //const translation = useTranslations();
  const [showImagePicker, setShowImagePicker] = useState(false);

  const handleProfilePic = (image: any) => {
    var data = new FormData();
    data.append('profile', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });
    const params = image?.base64 ? {profile: image.base64} : data;
    dispatch(loading(true));
    dispatch(editProfilePic(params as any)).finally(() => {
      dispatch(loading(false));
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coming soon</Text>
      <Button
        title="Edit Profile Pic"
        style={styles.button}
        onPress={() => setShowImagePicker(true)}
      />
      {/* <Button
        title="Change to English"
        style={styles.button}
        onPress={() => translation.changeLanguage('en')}
      />
      <Button
        title="Change tô French"
        style={styles.button}
        onPress={() => translation.changeLanguage('fr')}
      /> */}
      <ImagePicker
        show={showImagePicker}
        onChose={handleProfilePic}
        onClose={() => setShowImagePicker(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.Primary_Background[0],
  },
  title: {
    fontSize: fontSize(14),
    fontWeight: 'bold',
    fontFamily: FONTS.Primary_Bold,
    color: COLORS.Light,
  },
  button: {
    margin: 10,
  },
});
