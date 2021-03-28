import 'react-native-gesture-handler';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';

import {AppNavigator} from './navigations';
import {StateProvider} from './state';

const App = () => {
  return (
    <StateProvider>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </StateProvider>
  );
};

export default App;
