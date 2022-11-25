import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import Navigation from '~navigations';
import {NetError} from '~components';
import {store} from './app';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Navigation />
        <NetError />
      </Provider>
    </SafeAreaProvider>
  );
}
