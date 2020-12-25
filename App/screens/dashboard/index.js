import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

import {Routes} from '../../config';
import {useAuth} from '../../state/providers/auth/provider';

const DashboardScreen = ({navigation}) => {
  const {navigate: navigateTo} = navigation;

  const {state} = useAuth();

  console.log('Dashboard =', state);

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
