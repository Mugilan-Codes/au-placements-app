import React from 'react';
import {SafeAreaView, Text, TouchableHighlight} from 'react-native';

const LoginScreen = ({navigation}) => (
  <SafeAreaView>
    <Text>Screen: Login</Text>

    <TouchableHighlight onPress={() => navigation.navigate('Register')}>
      <Text>Go to Sign-Up Screen</Text>
    </TouchableHighlight>
  </SafeAreaView>
);

export default LoginScreen;
