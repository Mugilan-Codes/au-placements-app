import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import {Routes} from '../../config';

const LoginScreen = ({navigation}) => (
  <SafeAreaView style={styles.formView}>
    <Text>Screen: Login</Text>

    <TextInput placeholder="Email" keyboardType="email-address" />

    <TextInput placeholder="Password" secureTextEntry={true} />

    <TouchableOpacity onPress={() => navigation.navigate(Routes.REGISTER)}>
      <Text>Testing</Text>
    </TouchableOpacity>

    <TouchableHighlight onPress={() => navigation.navigate(Routes.REGISTER)}>
      <Text>Go to Sign-Up Screen</Text>
    </TouchableHighlight>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  formView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
