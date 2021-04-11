import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

import {Dimensions} from '../../utils';
import {useTheme} from '../../contexts';

const FormInput = ({placeholder, error, errorText, onBlur, ...props}) => {
  const {
    theme: {colors},
  } = useTheme();
  return (
    <View style={styles.wrapper}>
      <TextInput
        numberOfLines={1}
        placeholder={placeholder}
        placeholderTextColor="#666"
        onBlur={onBlur}
        {...props}
        style={[
          styles.input,
          error && styles.error,
          props.style,
          {color: colors.text, borderColor: colors.border},
        ]}
      />
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 15,
  },
  input: {
    padding: 10,
    width: Dimensions.WINDOW_WIDTH / 1.5,
    height: Dimensions.WINDOW_HEIGHT / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
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
