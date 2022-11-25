import React from 'react';
import {View, Text} from 'react-native';
import {StackScreenProps} from 'types';

export default function LogoutScreen({}: StackScreenProps<'Logout'>) {
  return (
    <View>
      <Text>Logout Screen</Text>
    </View>
  );
}
