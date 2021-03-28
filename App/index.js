import 'react-native-gesture-handler';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';

import {AppNavigator} from './navigations';
import {StateProvider} from './state';
import {useCustomTheme} from './hooks';

// TODO: Add Theme using react native paper and react navigation combined
// ? https://blog.logrocket.com/designing-a-ui-with-custom-theming-using-react-native-paper/
// ? https://callstack.github.io/react-native-paper/theming-with-react-navigation.html
// ? https://callstack.github.io/react-native-paper/theming.html
const App = () => {
  const theme = useCustomTheme();

  return (
    <StateProvider>
      <PaperProvider theme={theme}>
        <AppNavigator theme={theme} />
      </PaperProvider>
    </StateProvider>
  );
};

export default App;
