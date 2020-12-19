import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

import {Dimensions} from '../../utils';

const FormInput = ({labelValue, placeholderText, ...rest}) => {
  return (
    <TextInput
      numberOfLines={1}
      placeholder={placeholderText}
      placeholderTextColor="#666"
      style={styles.input}
      value={labelValue}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: Dimensions.WINDOW_WIDTH / 1.5,
    height: Dimensions.WINDOW_HEIGHT / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});

export default FormInput;
