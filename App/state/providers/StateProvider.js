// Inspired by [Phone-Store by trujic1000](https://github.com/trujic1000/phone-store/blob/master/src/global-state/state.js)

import React, {cloneElement} from 'react';
import {AuthProvider} from './auth';

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
    <ProviderComposer contexts={[<AuthProvider />]}>
      {children}
    </ProviderComposer>
  );
};

export default StateProvider;