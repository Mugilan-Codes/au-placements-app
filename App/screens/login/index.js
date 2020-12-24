import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableHighlight} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

import {Routes} from '../../config';
import {FormButton, FormInput} from '../../components';

const LoginScreen = ({navigation}) => {
  const {handleSubmit, control} = useForm();
  const {navigate: navigateTo} = navigation;

  const onSubmit = (data) => {
    console.log('data =', data);
    // navigateTo(Routes.HOME);
  };

  return (
    <SafeAreaView style={styles.formView}>
      <Text>Student Login</Text>

      <Controller
        defaultValue=""
        name="email"
        control={control}
        render={({onChange, value}) => (
          <FormInput
            placeholder="E-Mail Address"
            onChangeText={(text) => onChange(text)}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        )}
      />

      <Controller
        defaultValue=""
        name="password"
        control={control}
        render={({onChange, value}) => (
          <FormInput
            placeholder="Password"
            onChangeText={(text) => onChange(text)}
            value={value}
            secureTextEntry={true}
          />
        )}
      />

      <FormButton label="Submit" onPress={handleSubmit(onSubmit)} />

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
