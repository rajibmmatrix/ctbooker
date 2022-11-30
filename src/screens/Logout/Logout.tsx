import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {StackScreenProps} from 'types';
import {COLORS, _styles} from '~styles';

export default function LogoutScreen({navigation}: StackScreenProps<'Logout'>) {
  useEffect(() => {
    navigation.dispatch(
      CommonActions.reset({index: 1, routes: [{name: 'Auth'}]}),
    );
    return () => {};
  }, [navigation]);

  return (
    <View
      style={[
        _styles.container,
        _styles.allCenter,
        {backgroundColor: COLORS.Primary_Background[0]},
      ]}>
      <ActivityIndicator size={'large'} color={COLORS.Primary} />
    </View>
  );
}
