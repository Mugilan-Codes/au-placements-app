import React, {useRef} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {SafeAreaView, StyleSheet, Text, TouchableHighlight} from 'react-native';

import {FormButton, FormInput} from '../../components';
import {Routes} from '../../config';

const RegisterScreen = ({navigation}) => {
  const {handleSubmit, control, errors, watch} = useForm();
  const {navigate: navigateTo} = navigation;

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = (data) => {
    console.log('register data =', data);
    // navigateTo(Routes.HOME);
  };

  return (
    <SafeAreaView style={styles.formView}>
      <Text>Student Register</Text>

      {/*todo: course - Dynamically fetch from db and display it in dropdown box */}

      <Controller
        control={control}
        defaultValue=""
        name="register_no"
        render={({onChange, value}) => (
          <FormInput
            placeholder="Register Number"
            error={errors.register_no}
            errorText={errors?.register_no?.message}
            onChangeText={(text) => onChange(text)}
            value={value}
            keyboardType="numeric"
          />
        )}
        rules={{
          required: {value: true, message: 'Register Number is required'},
        }}
      />

      <Controller
        control={control}
        defaultValue=""
        name="name"
        render={({onChange, value}) => (
          <FormInput
            placeholder="Your Name"
            error={errors.name}
            errorText={errors?.name?.message}
            onChangeText={(text) => onChange(text)}
            value={value}
          />
        )}
        rules={{
          required: {value: true, message: 'Student Name is required'},
        }}
      />

      <Controller
        control={control}
        defaultValue=""
        name="email"
        render={({onChange, value}) => (
          <FormInput
            placeholder="E-Mail Address"
            error={errors.email}
            errorText={errors?.email?.message}
            onChangeText={(text) => onChange(text)}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
        rules={{
          required: {value: true, message: 'E-Mail is required'},
        }}
      />

      <Controller
        control={control}
        defaultValue=""
        name="password"
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
        rules={{
          required: {value: true, message: 'Password is required'},
        }}
      />

      <Controller
        control={control}
        defaultValue=""
        name="confirm_password"
        render={({onChange, value}) => (
          <FormInput
            placeholder="Confirm Password"
            error={errors.confirm_password}
            errorText={errors?.confirm_password?.message}
            onChangeText={(text) => onChange(text)}
            value={value}
            secureTextEntry={true}
          />
        )}
        rules={{
          validate: (value) =>
            value === password.current || 'The Passwords do not match',
        }}
      />

      <FormButton label="Submit" onPress={handleSubmit(onSubmit)} />

      <TouchableHighlight onPress={() => navigateTo(Routes.LOGIN)}>
        <Text>Go to Log-In Screen</Text>
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

export default RegisterScreen;
