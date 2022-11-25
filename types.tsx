import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DrawerScreenProps} from '@react-navigation/drawer';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}

//For Stack Navigations
export type StackParamList = {
  Splash: undefined;
  //Auth Screens
  Auth: undefined;
  Forgot: undefined;

  //App Screens
  Sidebar: NavigatorScreenParams<SideParamList> | undefined;
  Logout: undefined;
};

//For Side Navigations
export type SideParamList = {
  Tab: NavigatorScreenParams<TabParamList> | undefined;
  BookingResume: undefined;
  CarDocuments: undefined;
  ChangePassword: undefined;
  MakePayment: {id: string} | undefined;
  Payment: undefined;
  EditProfile: undefined;
};

//For Tab Navigations
export type TabParamList = {
  Home: undefined;
  Booking: undefined;
  Profile: undefined;
};

//For Stack Screens
export type StackScreenProps<Screen extends keyof StackParamList> =
  NativeStackScreenProps<StackParamList, Screen>;

//For Side Screens
export type SideScreenProps<Screen extends keyof SideParamList> =
  CompositeScreenProps<
    DrawerScreenProps<SideParamList, Screen>,
    NativeStackScreenProps<StackParamList>
  >;

//For Tab Screens
export type TabScreenProps<Screen extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, Screen>,
    //DrawerScreenProps<SideParamList>
    CompositeScreenProps<
      DrawerScreenProps<SideParamList>,
      NativeStackScreenProps<StackParamList>
    >
  >;

type MODE = 'Production' | 'Development';

export interface CONFIG {
  name: string;
  mode: MODE;
  version: string;
  baseURL: string;
  termsURL: string;
  policyURL: string;
  androidURL: string;
  iosURL: string;
}

export interface ILogin {
  phone_no: string;
}

export interface IVerify {
  phone_no: string;
  otp: string;
  device_id?: string;
  device_model?: string;
  device_type?: string;
}

export interface ISignup {
  full_name: string;
  email: string;
}
