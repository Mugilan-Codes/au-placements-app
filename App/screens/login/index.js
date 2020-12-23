import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import {Routes} from '../../config';
import {FormInput} from '../../components';
import {useAuth} from '../../state/providers/auth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    authActions: {loginStudent},
  } = useAuth();

  const {navigate: navigateTo} = navigation;

  const onSubmit = () => {
    loginStudent(email, password);
    navigateTo(Routes.HOME);
  };

  return (
    <SafeAreaView style={styles.formView}>
      <Text>Screen: Login</Text>

      <FormInput
        value={email}
        placeholderText="Email"
        onChangeText={(uEm) => setEmail(uEm)}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
      />

      {/* <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholder="Email"
        value={email}
      /> */}

      <TextInput
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
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
