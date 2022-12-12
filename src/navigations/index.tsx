import React, {useEffect} from 'react';
import {Alert, BackHandler} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthScreen, ForgotScreen, LogoutScreen, SplashScreen} from '~screens';
import Sidebar from './SideNavigation';
import config from '~config';
import {useTranslations} from '~translation';
import {api, log} from '~utils';
import {StackParamList} from 'types';
import {loading, useDispatch} from '~app';

const Stack = createNativeStackNavigator<StackParamList>();

interface IResponse {
  android_link: URL;
  file: URL;
  ios_link: URL;
  version: string;
  versionLatest: string;
}

export default function Navigation() {
  const dispatch = useDispatch();
  const {updateLanguage, version} = useTranslations();

  useEffect(() => {
    api
      .getDetails()
      .then(({data}: {data: IResponse}) => {
        if (data.version !== config.version) {
          Alert.alert(
            'Please Update',
            'Your app is outdated, Please update to continue.',
            [
              {
                text: 'OK',
                onPress: () => {
                  BackHandler.exitApp();
                },
              },
            ],
          );
        } else if (version !== data.versionLatest) {
          //Update Language from Server if not updated.
          Alert.alert(
            'Please Sync',
            'Your app is outdated, Please sync to continue.',
            [
              {
                text: 'OK',
                onPress: async () => {
                  dispatch(loading(true));
                  updateLanguage(data.versionLatest, () => {
                    dispatch(loading(false));
                  });
                },
              },
            ],
          );
        }
      })
      .catch(err => log(err));

    return () => {};
  }, [updateLanguage, version, dispatch]);

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
