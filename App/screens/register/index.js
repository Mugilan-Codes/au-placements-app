import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Pressable,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {TextInput, Subheading, Button, HelperText} from 'react-native-paper';
import Toast from 'react-native-toast-message';

import {
  AuthTitle,
  Container,
  SizedBox,
  ViewAreaSafe,
  ViewAvoidingKeyboard,
} from 'components';
import {Routes} from 'constants/routes';
import {validators} from 'utils';
import {useReduxDispatch, useReduxSelector} from 'store';
import {register, selectErrorMessage, clearError} from 'store/slices/authSlice';

const RegisterScreen = ({navigation}) => {
  const {handleSubmit, control, errors, watch} = useForm();
  const dispatch = useReduxDispatch();

  const serverError = useReduxSelector(selectErrorMessage);

  const password = useRef({});
  password.current = watch('password', '');

  const registerNoRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [secureTextExntry, setSecureTextExntry] = useState(true);
  const togglePasswordVisibility = () => {
    setSecureTextExntry(!secureTextExntry);
  };

  const onSubmit = (data) => {
    // TODO: clear error after displaying toast to avoid showing old error
    dispatch(register(data));
    serverError &&
      Toast.show({
        type: 'error',
        text1: `${serverError}`,
        text2: 'Try Again',
        duration: 3000,
      });
    dispatch(clearError());
  };

  const handleOnSubmit = handleSubmit(onSubmit);

  const navigateToLogin = () => {
    navigation.navigate(Routes.LOGIN);
  };

  // TODO: course - Dynamically fetch from db and display it in dropdown box
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <ViewAreaSafe>
          <ViewAvoidingKeyboard
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <AuthTitle>Create Account</AuthTitle>

            <SizedBox height={8} />

            <Subheading>Student Registration</Subheading>

            <Toast />

            <SizedBox height={32} />

            <Pressable onPress={() => registerNoRef.current?.focus()}>
              <Controller
                name="register_no"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: 'Register Number is required',
                  },
                }}
                render={({onChange, onBlur, value}) => (
                  <View style={styles.wrapper}>
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      ref={registerNoRef}
                      label="Register Number"
                      placeholder="2019202033"
                      keyboardType="number-pad"
                      returnKeyType="next"
                      onSubmitEditing={() => nameRef.current?.focus()}
                      error={!!errors?.register_no}
                      style={styles.formText}
                    />

                    <HelperText type="error" visible={!!errors?.register_no}>
                      {errors?.register_no?.message}
                    </HelperText>
                  </View>
                )}
              />
            </Pressable>

            <SizedBox height={4} />

            <Pressable onPress={() => nameRef.current?.focus()}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: 'Student Name is required',
                  },
                }}
                render={({onChange, onBlur, value}) => (
                  <View style={styles.wrapper}>
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      ref={nameRef}
                      label="Student Name"
                      placeholder="Mugilan E.S."
                      autoCompleteType="name"
                      autoCapitalize="words"
                      autoCorrect={false}
                      returnKeyType="next"
                      onSubmitEditing={() => emailRef.current?.focus()}
                      error={!!errors?.name}
                      style={styles.formText}
                    />

                    <HelperText type="error" visible={!!errors?.name}>
                      {errors?.name?.message}
                    </HelperText>
                  </View>
                )}
              />
            </Pressable>

            <SizedBox height={4} />

            <Pressable onPress={() => emailRef.current?.focus()}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Enter your e-mail',
                  pattern: {
                    value: validators.EMAIL_REGEX,
                    message: 'Enter a valid e-mail address',
                  },
                }}
                render={({onChange, onBlur, value}) => (
                  <View style={styles.wrapper}>
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      ref={emailRef}
                      label="E-mail"
                      placeholder="mugilancodes@gmail.com"
                      keyboardType="email-address"
                      autoCompleteType="email"
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="next"
                      onSubmitEditing={() => passwordRef.current?.focus()}
                      error={!!errors?.email}
                      style={styles.formText}
                    />

                    <HelperText type="error" visible={!!errors?.email}>
                      {errors?.email?.message}
                    </HelperText>
                  </View>
                )}
              />
            </Pressable>

            <SizedBox height={4} />

            <Pressable onPress={() => passwordRef.current?.focus()}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: {value: true, message: 'Password is required'},
                  minLength: {
                    value: 8,
                    message: 'Password must have at least 8 characters',
                  },
                }}
                render={({onChange, onBlur, value}) => (
                  <View style={styles.wrapper}>
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      ref={passwordRef}
                      label="Password"
                      placeholder="********"
                      secureTextEntry={secureTextExntry}
                      autoCompleteType="password"
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="next"
                      onSubmitEditing={() =>
                        confirmPasswordRef.current?.focus()
                      }
                      right={
                        <TextInput.Icon
                          name="eye"
                          onPress={togglePasswordVisibility}
                        />
                      }
                      error={!!errors?.password}
                      style={styles.formText}
                    />

                    <HelperText type="error" visible={!!errors?.password}>
                      {errors?.password?.message}
                    </HelperText>
                  </View>
                )}
              />
            </Pressable>

            <SizedBox height={4} />

            <Pressable onPress={() => confirmPasswordRef.current?.focus()}>
              <Controller
                name="confirm_password"
                control={control}
                defaultValue=""
                rules={{
                  validate: (value) =>
                    value === password.current || 'The Passwords do not match',
                }}
                render={({onChange, onBlur, value}) => (
                  <View style={styles.wrapper}>
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      ref={confirmPasswordRef}
                      label="Confirm Password"
                      placeholder="********"
                      secureTextEntry
                      autoCompleteType="password"
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="done"
                      onSubmitEditing={handleOnSubmit}
                      error={!!errors?.password}
                      style={styles.formText}
                    />

                    <HelperText
                      type="error"
                      visible={!!errors?.confirm_password}>
                      {errors?.confirm_password?.message}
                    </HelperText>
                  </View>
                )}
              />
            </Pressable>

            <SizedBox height={8} />

            <Button mode="contained" onPress={handleOnSubmit}>
              Register
            </Button>

            <SizedBox height={8} />

            <Button onPress={navigateToLogin}>Go to Login Screen</Button>
          </ViewAvoidingKeyboard>
        </ViewAreaSafe>
      </Container>
    </TouchableWithoutFeedback>
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
  formText: {
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  errorText: {
    marginTop: 1,
    color: 'red',
  },
  wrapper: {
    marginBottom: 15,
  },
});

export default RegisterScreen;
