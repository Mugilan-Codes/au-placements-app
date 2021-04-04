import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableHighlight} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

import {Routes} from '../../config';
import {FormButton, FormInput, ScreenHeader} from '../../components';
import {useAuth} from '../../state';
import {validators} from '../../utils';
import {View} from 'react-native';

const LoginScreen = ({navigation}) => {
  const {handleSubmit, control, errors} = useForm();
  const {login} = useAuth();

  const onSubmit = (data) => {
    // TODO: Present a Loading while logging in. Use global loader context
    login(data);
  };

  // TODO: Add Server Side Validation
  //? https://www.carlrippon.com/react-hook-form-server-validation/
  return (
    <SafeAreaView style={styles.content}>
      <ScreenHeader title="Student Login" />

      <View style={styles.formView}>
        <Controller
          defaultValue=""
          name="email"
          control={control}
          rules={{
            required: 'E-Mail is required',
            pattern: {
              value: validators.EMAIL_REGEX,
              message: 'Must be a valid email',
            },
          }}
          render={({onChange, onBlur, value}) => (
            <FormInput
              placeholder="E-Mail Address"
              error={errors.email}
              errorText={errors?.email?.message}
              onBlur={onBlur}
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
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must have at least 8 characters',
            },
          }}
          render={({onChange, onBlur, value}) => (
            <FormInput
              placeholder="Password"
              error={errors.password}
              errorText={errors?.password?.message}
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
              secureTextEntry={true}
            />
          )}
        />

        <FormButton label="Login" onPress={handleSubmit(onSubmit)} />

        <TouchableHighlight
          onPress={() => navigation.navigate(Routes.REGISTER)}>
          <Text>Go to Sign-Up Screen</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
