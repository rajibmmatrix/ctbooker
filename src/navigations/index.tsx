import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthScreen, ForgotScreen, LogoutScreen, SplashScreen} from '~screens';
import Sidebar from './SideNavigation';
import {StackParamList} from 'types';

const Stack = createNativeStackNavigator<StackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Group>
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Forgot" component={ForgotScreen} />
        </Stack.Group>
        <Stack.Screen name="Sidebar" component={Sidebar} />
        <Stack.Screen name="Logout" component={LogoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
