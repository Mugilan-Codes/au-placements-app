import 'react-native-gesture-handler';
import React from 'react';
import {enableScreens} from 'react-native-screens';

import {AppNavigator} from './navigations';
import {StateProvider} from './contexts';

enableScreens();
const App = () => {
  return (
    <StateProvider>
      <AppNavigator />
    </StateProvider>
  );
};

export default App;
