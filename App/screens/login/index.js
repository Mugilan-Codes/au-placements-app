import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Pressable,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {TextInput, Subheading, Button, HelperText} from 'react-native-paper';
import Toast from 'react-native-toast-message';

import {Routes} from 'constants/routes';
import {
  SizedBox,
  Container,
  ViewAreaSafe,
  ViewAvoidingKeyboard,
  AuthTitle,
} from 'components';
import {validators} from 'utils';
import {useReduxDispatch, useReduxSelector} from 'store';
import {login, selectErrorMessage} from 'store/slices/authSlice';

const LoginScreen = ({navigation}) => {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm();
  const dispatch = useReduxDispatch();

  const serverError = useReduxSelector(selectErrorMessage);

  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  // TODO: display toast error and clear that errror after some time
  const onSubmit = (data) => {
    // TODO: Present a Loading while logging in. Use global loader context
    dispatch(login({email: data.email, password: data.password}));
    serverError &&
      Toast.show({
        type: 'error',
        text1: `${serverError}`,
        text2: 'Try Again',
        duration: 3000,
      });
  };

  const handleOnSubmit = handleSubmit(onSubmit);

  const navigateToRegister = () => {
    navigation.navigate(Routes.REGISTER);
  };

  // TODO: Add Server Side Validation
  // REF: https://www.carlrippon.com/react-hook-form-server-validation/
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <ViewAreaSafe>
          <ViewAvoidingKeyboard
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <AuthTitle>Welcome Back!</AuthTitle>

            <SizedBox height={8} />

            <Subheading>Sign In to your account</Subheading>

            <Toast />

            <SizedBox height={32} />

            <Pressable onPress={() => emailInput.current?.focus()}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: 'E-Mail is required',
                  pattern: {
                    value: validators.EMAIL_REGEX,
                    message: 'Must be a valid email',
                  },
                }}
                render={({onChange, onBlur, value}) => (
                  <View style={styles.wrapper}>
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize="none"
                      autoCompleteType="email"
                      autoCorrect={false}
                      keyboardType="email-address"
                      ref={emailInput}
                      returnKeyType="next"
                      onSubmitEditing={() => passwordInput.current?.focus()}
                      label="E-Mail"
                      placeholder="john.doe@gmail.com"
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

            <SizedBox height={16} />

            <Pressable onPress={() => passwordInput.current?.focus()}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Password is required',
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
                      autoCapitalize="none"
                      autoCompleteType="password"
                      autoCorrect={false}
                      secureTextEntry
                      ref={passwordInput}
                      returnKeyType="done"
                      onSubmitEditing={handleOnSubmit}
                      label="Password"
                      right={<TextInput.Icon name="eye" />} // TODO: add show password on icon click
                      error={!!errors.password}
                      style={styles.formText}
                    />

                    <HelperText type="error" visible={!!errors?.password}>
                      {errors?.password?.message}
                    </HelperText>
                  </View>
                )}
              />
            </Pressable>

            <SizedBox height={16} />

            <Button mode="contained" onPress={handleOnSubmit}>
              Login
            </Button>

            <SizedBox height={16} />

            <Button onPress={navigateToRegister}>Go to Sign-Up Screen</Button>
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

export default LoginScreen;
