import React, {FC, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {SvgProps} from 'react-native-svg';
import {useTranslations} from '~translation';
import {Icons} from '~constants';
import {COLORS, FONTS, fontSize, screenHeight, SIZES, _styles} from '~styles';
import {loading, logout, useDispatch} from '~app';

interface Props {
  title: string;
  Icon: FC<SvgProps>;
  onPress: () => void;
}

const Item: FC<Props> = memo(({title, Icon, onPress}) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Icon width={16} height={16} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
});

const CustomSidebar: FC<DrawerContentComponentProps> = props => {
  const dispatch = useDispatch();
  const {translation} = useTranslations();

  const handleLogout = async () => {
    dispatch(loading(true));
    dispatch(logout())
      .unwrap()
      .then(() => {
        props.navigation.dispatch(
          CommonActions.reset({index: 1, routes: [{name: 'Auth'}]}),
        );
      })
      .catch(() => {})
      .finally(() => dispatch(loading(false)));
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={_styles.container}>
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <Icons.Menu />
          </TouchableOpacity>
          <Item
            title={translation.vehicle_documents}
            Icon={Icons.SideCar}
            onPress={() => props.navigation.navigate('CarDocuments')}
          />
          <Item
            title={translation.payment}
            Icon={Icons.EmptyWallet}
            onPress={() => props.navigation.navigate('Payment')}
          />
          <Item
            title={translation.historical}
            Icon={Icons.Stickynote}
            onPress={() => props.navigation.navigate('BookingResume')}
          />
        </View>
        <Item
          title={translation.signout}
          Icon={Icons.Signout}
          onPress={handleLogout}
        />
      </View>
    </View>
  );
};

export default CustomSidebar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRightWidth: 1,
    borderTopRightRadius: 71,
    borderBottomRightRadius: 71,
    borderRightColor: COLORS.Gray,
    backgroundColor: COLORS.Dark_Card,
  },
  main: {
    flex: 1,
    paddingTop: SIZES.V12 * 2,
    paddingLeft: 19,
    paddingBottom: SIZES.V110 / 2,
    height: screenHeight - 20,
  },
  item: {
    marginTop: SIZES.V12 * 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: fontSize(13),
    fontWeight: '500',
    fontFamily: FONTS.Primary_Medium,
    color: COLORS.Light,
    lineHeight: 20,
    marginLeft: 16,
  },
});
