import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  BookingResumeScreen,
  CarDocumentsScreen,
  ChangePasswordScreen,
  EditProfileScreen,
  MakePaymentScreen,
  PaymentScreen,
} from '~screens';
import Tabs from './TabNavigation';
import {SideParamList} from 'types';

const Drawer = createDrawerNavigator<SideParamList>();

export default function Sidebar() {
  return (
    <Drawer.Navigator initialRouteName="Tab">
      <Drawer.Screen name="Tab" component={Tabs} />
      <Drawer.Screen name="BookingResume" component={BookingResumeScreen} />
      <Drawer.Screen name="CarDocuments" component={CarDocumentsScreen} />
      <Drawer.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Drawer.Screen name="MakePayment" component={MakePaymentScreen} />
      <Drawer.Screen name="Payment" component={PaymentScreen} />
      <Drawer.Screen name="EditProfile" component={EditProfileScreen} />
    </Drawer.Navigator>
  );
}
