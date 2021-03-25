import 'react-native-gesture-handler';
import React from 'react';

import {AppNavigator} from './navigations';
import {StateProvider} from './state';

const App = () => {
  return (
    <StateProvider>
      <AppNavigator />
    </StateProvider>
  );
};

export default App;
