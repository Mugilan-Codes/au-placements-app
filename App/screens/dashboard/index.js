import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

import {Routes} from '../../config';

const DashboardScreen = ({navigation}) => {
  const {navigate: navigateTo} = navigation;

  return (
    <View>
      <Text>DashboardScreen</Text>
      <TouchableHighlight onPress={() => navigateTo(Routes.LOGIN)}>
        <Text>Back to Log-In</Text>
      </TouchableHighlight>
    </View>
  );
};

export default DashboardScreen;
