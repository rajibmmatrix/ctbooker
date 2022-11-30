import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  BookingResumeScreen,
  CarDocumentsScreen,
  ChangePasswordScreen,
  EditProfileScreen,
  MakeBookingScreen,
  NotificationScreen,
  PaymentScreen,
} from '~screens';
import {CustomSidebar} from '~components';
import Tabs from './TabNavigation';
import {SideParamList} from 'types';

const Drawer = createDrawerNavigator<SideParamList>();

export default function Sidebar() {
  return (
    <Drawer.Navigator
      initialRouteName="Tab"
      drawerContent={props => <CustomSidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {backgroundColor: 'transparent'},
      }}>
      <Drawer.Screen name="Tab" component={Tabs} />
      <Drawer.Screen name="BookingResume" component={BookingResumeScreen} />
      <Drawer.Screen name="CarDocuments" component={CarDocumentsScreen} />
      <Drawer.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Drawer.Screen name="MakeBooking" component={MakeBookingScreen} />
      <Drawer.Screen name="Payment" component={PaymentScreen} />
      <Drawer.Screen name="EditProfile" component={EditProfileScreen} />
      <Drawer.Screen name="Notification" component={NotificationScreen} />
    </Drawer.Navigator>
  );
}
