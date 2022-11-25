import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from 'types';
import SignupScreen from './Signup';
import LoginScreen from './Login';

export default function AuthScreen({navigation}: StackScreenProps<'Auth'>) {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Auth Screen</Text>
      <Button title="Forgot" onPress={() => navigation.navigate('Forgot')} />
      <Button title="Change" onPress={() => setShowLogin(prev => !prev)} />
      {showLogin ? <LoginScreen /> : <SignupScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
});
