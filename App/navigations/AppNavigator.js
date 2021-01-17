import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes} from '../config';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import {useAuth} from '../state/providers/auth';

const Main = createStackNavigator();

const AppNavigator = () => {
  const {state} = useAuth();
  console.log(state);
  console.log('isAuthenticated = ', state.isAuthenticated);
  return (
    <NavigationContainer>
      <Main.Navigator screenOptions={{headerShown: false}}>
        {state.isAuthenticated ? (
          <Main.Screen name={Routes.HOME} component={HomeNavigator} />
        ) : (
          <Main.Screen name={Routes.AUTH} component={AuthNavigator} />
        )}
      </Main.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
