import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import {Routes} from '../config';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import {useTheme} from '../contexts';
import {selectIsAuthenticated} from '../store/slices/authSlice';

const Main = createStackNavigator();

// TODO: Setup automatic signin
const AppNavigator = () => {
  const {theme} = useTheme();

  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <NavigationContainer theme={theme}>
      <Main.Navigator screenOptions={{headerShown: false}}>
        {isAuthenticated ? (
          <Main.Screen name={Routes.HOME} component={HomeNavigator} />
        ) : (
          <Main.Screen name={Routes.AUTH} component={AuthNavigator} />
        )}
      </Main.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
