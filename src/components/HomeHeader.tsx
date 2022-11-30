import React, {FC, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icons} from '~constants';
import {COLORS, FONTS} from '~styles';

interface Props {
  title: string;
  showNotification?: boolean;
}

const HomeHeader: FC<Props> = ({title}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation?.openDrawer()}>
        <Icons.Menu width={19} height={19} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Notification' as any)}>
        <Icons.Notification width={19} height={19} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(HomeHeader);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 26,
  },
  title: {
    fontSize: 13,
    fontWeight: '300',
    fontFamily: FONTS.Primary_Light,
    color: COLORS.Light,
    textAlign: 'center',
  },
});
