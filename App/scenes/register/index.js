import React from 'react';
import {SafeAreaView, Text, TouchableHighlight} from 'react-native';

const RegisterScreen = ({navigation}) => (
  <SafeAreaView>
    <Text>Screen: Register</Text>

    <TouchableHighlight onPress={() => navigation.navigate('Login')}>
      <Text>Go to Log-In Screen</Text>
    </TouchableHighlight>
  </SafeAreaView>
);

export default RegisterScreen;
