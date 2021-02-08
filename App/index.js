import 'react-native-gesture-handler';
import React from 'react';
import {useColorScheme} from 'react-native';

import {AppNavigator} from './navigations';
import {StateProvider} from './state';

const App = () => {
  const colorScheme = useColorScheme();
  console.log({colorScheme});
  return (
    <StateProvider>
      <AppNavigator />
    </StateProvider>
  );
};

export default App;
