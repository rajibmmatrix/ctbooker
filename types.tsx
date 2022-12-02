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

export type IBooking = 'Technical Control' | 'Against Visit' | 'Car Repair';

//For Side Navigations
export type SideParamList = {
  Tab: NavigatorScreenParams<TabParamList> | undefined;
  BookingResume: undefined;
  CarDocuments: undefined;
  ChangePassword: undefined;
  MakeBooking: {type: IBooking};
  Payment: undefined;
  EditProfile: undefined;
  Notification: undefined;
};

//For Tab Navigations
export type TabParamList = {
  Home: undefined;
  Booking: undefined;
  Account: undefined;
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

export type ILANG = 'en' | 'fr';

export interface CONFIG {
  name: string;
  mode: MODE;
  lang: ILANG;
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

export interface ITranslation {
  login_title: string;
  email: string;
  password: string;
  forgot_password: string;
  login_tab: string;
  signup_tab: string;
  login_button: string;
  signup_button: string;
  termes_and_conditions: string;
  individual_btn: string;
  profesonal_btn: string;
  fname: string;
  lname: string;
  create_password: string;
  home_title: string;
  home_description: string;
  booking: string;
  booking_title: string;
  type_of_service: string;
  technical_control: string;
  against_visit: string;
  car_repair: string;
  vehicle_documents: string;
  payment: string;
  historical: string;
  signout: string;
  welcome: string;
  reservation: string;
  my_account: string;
  technical_control_title: string;
  against_visit_title: string;
  car_repair_title: string;
  date_of_reservition: string;
  date: string;
  pickup_time: string;
  pickup_location: string;
  deposit_same_place: string;
  different_deposit_location: string;
  deposit_address: string;
  price: string;
  insurance_card_number: string;
  gray_card: string;
  valid_technical_control: string;
  attachments: string;
  next: string;
  vehicle_problem: string;
  max_characters: string;
  booking_history: string;
  service_type: string;
  car_details: string;
}
