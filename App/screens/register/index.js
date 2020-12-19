import React from 'react';
import {SafeAreaView, Text, TouchableHighlight} from 'react-native';

import {Routes} from '../../config';

const RegisterScreen = ({navigation}) => (
  <SafeAreaView>
    <Text>Screen: Register</Text>

    <TouchableHighlight onPress={() => navigation.navigate(Routes.LOGIN)}>
      <Text>Go to Log-In Screen</Text>
    </TouchableHighlight>
  </SafeAreaView>
);

export default RegisterScreen;
