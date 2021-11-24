import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes} from '../config';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import {useTheme} from '../contexts';
import {
  selectIsAuthenticated,
  selectUser,
  selectAccessToken,
  selectIsLoading,
  load,
} from '../store/slices/authSlice';
import {useReduxDispatch, useReduxSelector} from '../store';

const Main = createStackNavigator();

// TODO: Setup automatic signin
const AppNavigator = () => {
  const {theme} = useTheme();
  const dispatch = useReduxDispatch();

  const isAuthenticated = useReduxSelector(selectIsAuthenticated);
  const user = useReduxSelector(selectUser);
  const accessToken = useReduxSelector(selectAccessToken);
  const isLoading = useReduxSelector(selectIsLoading);

  console.log({user});
  console.log({isAuthenticated});
  console.log({accessToken});
  console.log({isLoading});

  useEffect(() => {
    console.log('AppNavigator');
    if (accessToken) {
      dispatch(load());
    }
  }, [accessToken, dispatch]);

  // TODO: check if access token exists and get the user

  return (
    <NavigationContainer theme={theme}>
      <Main.Navigator screenOptions={{headerShown: false}}>
        {user && accessToken ? (
          <Main.Screen name={Routes.HOME} component={HomeNavigator} />
        ) : (
          <Main.Screen name={Routes.AUTH} component={AuthNavigator} />
        )}
      </Main.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
