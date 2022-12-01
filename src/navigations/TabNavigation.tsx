import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BookingScreen, HomeScreen, AccountScreen} from '~screens';
import {CustomBottom} from '~components';
import {Icons} from '~constants';
import {COLORS, FONTS, _styles} from '~styles';
import {useTranslations} from '~translation';
import {TabParamList} from 'types';

const Tab = createBottomTabNavigator<TabParamList>();

export default function Tabs() {
  const translations = useTranslations();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarBackground: () => <CustomBottom />,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          lineHeight: 16,
          fontFamily: FONTS.Primary_Medium,
          color: COLORS.Light,
          textAlign: 'center',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: translations.welcome,
          tabBarIcon: () => <Icons.House width={20} height={20} />,
        }}
      />
      <Tab.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          title: translations.reservation,
          tabBarIcon: () => (
            <Icons.BookingTab
              width={63}
              height={63}
              style={_styles.bookingIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: translations.my_account,
          tabBarIcon: () => <Icons.House width={18} height={18} />,
        }}
      />
    </Tab.Navigator>
  );
}
