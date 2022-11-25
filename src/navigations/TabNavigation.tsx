import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BookingScreen, HomeScreen, ProfileScreen} from '~screens';
import {TabParamList} from 'types';

const Tab = createBottomTabNavigator<TabParamList>();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Booking" component={BookingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
