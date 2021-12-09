import React from 'react';

import {ThemeProvider} from './theme';

const combineProviders = (providers) =>
  providers.reduce((Combined, Provider) => ({children}) => (
    <Combined>
      <Provider>{children}</Provider>
    </Combined>
  ));
// const Providers = combineProviders([ThemeProvider]);
const StateProvider = combineProviders([ThemeProvider]);

export default StateProvider;
