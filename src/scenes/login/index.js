import React from 'react';
import {SafeAreaView, Text, TouchableHighlight} from 'react-native';

const LoginScreen = () => (
  <SafeAreaView>
    <Text>Screen: Login</Text>

    <TouchableHighlight>
      <Text>Go to Sign-Up Screen</Text>
    </TouchableHighlight>
  </SafeAreaView>
);

export default LoginScreen;
