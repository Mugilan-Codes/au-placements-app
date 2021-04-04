import 'react-native-gesture-handler';
import React from 'react';
// Before rendering any navigation stack
// ? https://reactnavigation.org/docs/react-native-screens
import {enableScreens} from 'react-native-screens';

import {AppNavigator} from './navigations';
import {StateProvider} from './state';

const App = () => {
  enableScreens();
  return (
    <StateProvider>
      <AppNavigator />
    </StateProvider>
  );
};

export default App;
