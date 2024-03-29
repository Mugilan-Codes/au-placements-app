import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes} from 'constants/routes';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import {useTheme} from 'contexts';
import {selectAccessToken} from 'store/slices/authSlice';
import {selectIsAuthenticated, load} from 'store/slices/userSlice';
import {useReduxDispatch, useReduxSelector} from 'store';

const Main = createStackNavigator();

const AppNavigator = () => {
  const {theme} = useTheme();
  const dispatch = useReduxDispatch();

  const isAuthenticated = useReduxSelector(selectIsAuthenticated);
  const accessToken = useReduxSelector(selectAccessToken);

  // console.log({isAuthenticated});
  // console.log({accessToken});

  useEffect(() => {
    if (accessToken) {
      dispatch(load());
    }
  }, [accessToken, dispatch]);

  return (
    <NavigationContainer theme={theme}>
      <Main.Navigator screenOptions={{headerShown: false}}>
        {accessToken && isAuthenticated ? (
          <Main.Screen name={Routes.HOME} component={HomeNavigator} />
        ) : (
          <Main.Screen name={Routes.AUTH} component={AuthNavigator} />
        )}
      </Main.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
