import 'react-native-gesture-handler';
import React from 'react';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AppNavigator} from 'navigations';
import {StateProvider} from 'contexts';
import StoreProvider from 'store';

enableScreens();
const App = () => {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <StateProvider>
          <AppNavigator />
        </StateProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
};

export default App;
