import React from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from 'react-native-paper';

import {useCustomTheme} from '../../state';

const ScreenHeader = ({title, subText}) => {
  const {colors} = useTheme();
  // const {
  //   theme: {colors},
  // } = useCustomTheme();
  return (
    <SafeAreaView style={[styles.content, {backgroundColor: colors.accent}]}>
      <Text style={[styles.headerText, {color: colors.text}]}>{title}</Text>
      {subText ? (
        <Text style={[styles.subText, {color: colors.text}]}>{subText}</Text>
      ) : null}
    </SafeAreaView>
  );
};

ScreenHeader.propTypes = {
  title: PropTypes.string,
};

ScreenHeader.defaultProps = {
  title: 'ScreenHeader Title',
};

export default ScreenHeader;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
  },
  subText: {
    fontSize: 15,
  },
});
