import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function NotificationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#000000',
  },
});
