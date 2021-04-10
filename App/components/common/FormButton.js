import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {Dimensions} from '../../utils';
import {useCustomTheme} from '../../contexts';

const FormButton = ({label, ...props}) => {
  const {
    theme: {colors},
  } = useCustomTheme();
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: colors.background}]}
      {...props}>
      <Text style={[styles.buttonLabel, {color: colors.primary}]}>
        {label.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: Dimensions.WINDOW_WIDTH / 2,
    height: Dimensions.WINDOW_HEIGHT / 15,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 28,
  },
});

export default FormButton;
