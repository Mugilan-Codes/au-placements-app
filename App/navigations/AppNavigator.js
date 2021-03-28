import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes} from '../config';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import {useAuth} from '../state/providers/auth';

const Main = createStackNavigator();

// TODO: Setup automatic signin
const AppNavigator = ({theme}) => {
  const {state, restoreToken} = useAuth();

  useEffect(() => {
    restoreToken();
  }, [restoreToken]);

  return (
    <NavigationContainer theme={theme}>
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
