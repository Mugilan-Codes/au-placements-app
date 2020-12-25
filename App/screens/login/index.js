import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableHighlight} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

import {Routes} from '../../config';
import {FormButton, FormInput} from '../../components';
import {useAuth} from '../../state/providers/auth';

const LoginScreen = ({navigation}) => {
  const {handleSubmit, control, errors} = useForm();
  const {navigate: navigateTo} = navigation;
  const {login} = useAuth();

  const onSubmit = (data) => {
    console.log('data =', data);
    login(data);
  };

  return (
    <SafeAreaView style={styles.formView}>
      <Text>Student Login</Text>

      <Controller
        defaultValue=""
        name="email"
        control={control}
        rules={{required: {value: true, message: 'E-Mail is required'}}}
        render={({onChange, value}) => (
          <FormInput
            placeholder="E-Mail Address"
            error={errors.email}
            errorText={errors?.email?.message}
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
        rules={{required: {value: true, message: 'Password is required'}}}
        render={({onChange, value}) => (
          <FormInput
            placeholder="Password"
            error={errors.password}
            errorText={errors?.password?.message}
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
