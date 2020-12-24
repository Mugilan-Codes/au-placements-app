import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

import {Dimensions} from '../../utils';

const FormInput = ({placeholder, error, errorText, ...props}) => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        numberOfLines={1}
        placeholder={placeholder}
        placeholderTextColor="#666"
        {...props}
        style={[styles.input, error && styles.error, props.style]}
      />
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 5,
  },
  input: {
    padding: 10,
    width: Dimensions.WINDOW_WIDTH / 1.5,
    height: Dimensions.WINDOW_HEIGHT / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
    color: 'yellow', //todo: Change based on Theme (Light or Dark)
  },
  error: {
    borderColor: 'red',
  },
  errorText: {
    marginTop: 1,
    color: 'red',
  },
});

export default FormInput;
