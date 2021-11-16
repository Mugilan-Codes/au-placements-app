import 'react-native-gesture-handler';
import React from 'react';
import {enableScreens} from 'react-native-screens';

import {AppNavigator} from './navigations';
import {StateProvider} from './contexts';
import StoreProvider from './store';

enableScreens();
const App = () => {
  return (
    <StoreProvider>
      <StateProvider>
        <AppNavigator />
      </StateProvider>
    </StoreProvider>
  );
};

export default App;
