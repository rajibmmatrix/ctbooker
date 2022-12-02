import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import TranslationProvider from './translation';
import Navigation from './navigations';
import {NetError, Spinner} from './components';
import {store} from './app';

export default function App() {
  return (
    <SafeAreaProvider>
      <TranslationProvider>
        <Provider store={store}>
          <Navigation />
          <Spinner />
          <NetError />
        </Provider>
      </TranslationProvider>
    </SafeAreaProvider>
  );
}
