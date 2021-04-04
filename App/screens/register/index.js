import React, {useRef} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import {FormButton, FormInput, ScreenHeader} from '../../components';
import {Routes} from '../../config';
import {useAuth} from '../../state';
import {validators} from '../../utils';

const RegisterScreen = ({navigation}) => {
  const {handleSubmit, control, errors, watch} = useForm();
  const {register} = useAuth();

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = (data) => {
    // TODO: Present a Loading
    register(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Student Register" />

      {/*todo: course - Dynamically fetch from db and display it in dropdown box */}

      <View style={styles.formView}>
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
            required: 'Enter your e-mail',
            pattern: {
              value: validators.EMAIL_REGEX,
              message: 'Enter a valid e-mail address',
            },
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

        <FormButton label="Register" onPress={handleSubmit(onSubmit)} />

        <TouchableHighlight onPress={() => navigation.navigate(Routes.LOGIN)}>
          <Text>Go to Log-In Screen</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default RegisterScreen;
