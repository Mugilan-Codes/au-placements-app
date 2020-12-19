import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

import {Routes} from '../../config';

const DashboardScreen = ({navigation}) => {
  return (
    <View>
      <Text>DashboardScreen</Text>
      <TouchableHighlight onPress={() => navigation.navigate(Routes.LOGIN)}>
        <Text>Back to Log-In</Text>
      </TouchableHighlight>
    </View>
  );
};

export default DashboardScreen;
