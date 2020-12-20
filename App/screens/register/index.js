import React from 'react';
import {SafeAreaView, Text, TouchableHighlight} from 'react-native';

import {Routes} from '../../config';

const RegisterScreen = ({navigation}) => {
  const {navigate: navigateTo} = navigation;

  return (
    <SafeAreaView>
      <Text>Screen: Register</Text>

      <TouchableHighlight onPress={() => navigateTo(Routes.LOGIN)}>
        <Text>Go to Log-In Screen</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

export default RegisterScreen;
