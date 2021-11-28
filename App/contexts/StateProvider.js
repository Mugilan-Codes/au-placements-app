// Inspired by [Phone-Store by trujic1000](https://github.com/trujic1000/phone-store/blob/master/src/global-state/state.js)

import React, {cloneElement} from 'react';

import {ThemeProvider} from './theme';

// reduceRight works in reverse as opposed to reduce
// kids = accumulator, parent = currentValue
const ProviderComposer = ({contexts, children}) => {
  return contexts.reduceRight(
    (kids, parent) => cloneElement(parent, {children: kids}),
    children,
  );
};

const StateProvider = ({children}) => {
  return (
    <ProviderComposer contexts={[<ThemeProvider />]}>
      {children}
    </ProviderComposer>
  );
};

export default StateProvider;
