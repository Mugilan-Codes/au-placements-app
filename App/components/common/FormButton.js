import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {Mixins} from '../../styles';

const FormButton = ({buttonTitle, ...rest}) => (
  <TouchableOpacity style={styles.buttonContainer} {...rest}>
    <Text style={styles.buttonText}>{buttonTitle}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: Mixins.WINDOW_WIDTH / 2,
    height: Mixins.WINDOW_HEIGHT / 15,
    backgroundColor: '#6646ee',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 28,
    color: '#ffffff',
  },
});

export default FormButton;
