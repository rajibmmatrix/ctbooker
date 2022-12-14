import React from 'react';
import {NativeModules} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import TranslationProvider from './translation';
import Navigation from './navigations';
import {NetError, Spinner} from './components';
import {store} from './app';
import {_styles} from '~styles';

if (__DEV__) {
  NativeModules.DevSettings.setIsDebuggingRemotely(true);
}

export default function App() {
  return (
    <SafeAreaProvider>
      <TranslationProvider>
        <Provider store={store}>
          <SafeAreaView style={_styles.container}>
            <Navigation />
            <Spinner />
            <NetError />
          </SafeAreaView>
        </Provider>
      </TranslationProvider>
    </SafeAreaProvider>
  );
}
