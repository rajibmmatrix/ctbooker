import React, {FC, memo} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {SvgProps} from 'react-native-svg';
import {COLORS, FONTS, _styles} from '~styles';
import {useTranslations} from '~translation';
import {Icons} from '~constants';

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
  const translations = useTranslations();

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.main}>
        <View style={_styles.container}>
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <Icons.Menu />
          </TouchableOpacity>
          <Item
            title={translations.vehicle_documents}
            Icon={Icons.SideCar}
            onPress={() => props.navigation.navigate('CarDocuments')}
          />
          <Item
            title={translations.payment}
            Icon={Icons.EmptyWallet}
            onPress={() => props.navigation.navigate('Payment')}
          />
          <Item
            title={translations.historical}
            Icon={Icons.Stickynote}
            onPress={() => props.navigation.navigate('BookingResume')}
          />
        </View>
        <Item
          title={translations.signout}
          Icon={Icons.Signout}
          onPress={() => props.navigation.navigate('Logout')}
        />
      </View>
    </DrawerContentScrollView>
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
    paddingTop: 24,
    paddingLeft: 19,
    paddingBottom: 55,
    height: Dimensions.get('window').height - 20,
  },
  item: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: FONTS.Primary_Medium,
    color: COLORS.Light,
    lineHeight: 20,
    marginLeft: 16,
  },
});
