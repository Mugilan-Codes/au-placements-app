import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import {Routes} from '../../config';
import {FormInput} from '../../components';

const LoginScreen = ({navigation}) => {
  const {navigate: navigateTo} = navigation;

  const onSubmit = () => {
    navigateTo(Routes.HOME);
  };

  return (
    <SafeAreaView style={styles.formView}>
      <Text>Student Login</Text>

      <FormInput
        label="email"
        placeholder="Enter your E-mail Address"
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
      />

      <FormInput
        label="password"
        placeholder="Enter your password"
        secureTextEntry={true}
      />

      <TouchableOpacity onPress={onSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>

      <TouchableHighlight onPress={() => navigateTo(Routes.REGISTER)}>
        <Text>Go to Sign-Up Screen</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
