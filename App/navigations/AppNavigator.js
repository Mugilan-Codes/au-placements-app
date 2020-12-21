import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {LoginScreen, RegisterScreen} from '../screens';
import {Routes} from '../config';
import HomeNavigator from './HomeNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Routes.LOGIN}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
        <Stack.Screen name={Routes.REGISTER} component={RegisterScreen} />
        <Stack.Screen name={Routes.HOME} component={HomeNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
