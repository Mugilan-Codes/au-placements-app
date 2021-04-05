import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme, Switch} from 'react-native-paper';

import {useCustomTheme} from '../../state';

const ScreenHeader = ({title}) => {
  const theme = useTheme();
  const {toggleTheme, isThemeDark} = useCustomTheme();
  return (
    <View style={styles.content}>
      <Text style={styles.headerText}>{title}</Text>
      {/* <Switch
        value={isThemeDark}
        onValueChange={toggleTheme}
        style={[styles.switchStyle, {backgroundColor: theme.colors.accent}]}
        color={'red'}
      /> */}
    </View>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  headerText: {
    fontSize: 30,
  },
  switchStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
