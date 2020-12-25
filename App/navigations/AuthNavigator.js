import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {LoginScreen, RegisterScreen} from '../screens';
import {Routes} from '../config';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.LOGIN}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={Routes.REGISTER} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
