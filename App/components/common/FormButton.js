import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';

import {Colors} from '../../styles';
import {Dimensions} from '../../utils';

const FormButton = ({label, ...props}) => {
  const {colors} = useTheme();
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
    // backgroundColor: Colors.SECONDARY,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 28,
    // color: '#ffffff',
  },
});

export default FormButton;
