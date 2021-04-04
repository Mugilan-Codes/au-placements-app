import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes} from '../config';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import {useAuth, useTheme} from '../state';

const Main = createStackNavigator();

// TODO: Setup automatic signin
const AppNavigator = () => {
  const {state, restoreToken} = useAuth();

  // TODO: Get theme from ThemeProvider using useTheme() and pass it to NavigationContainer
  // TODO: useEffect to reload the Navigator whenever there is a change in theme
  // const {themeState} = useTheme();

  useEffect(() => {
    restoreToken();
  }, [restoreToken]);

  return (
    // <NavigationContainer theme={themeState.theme}>
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
