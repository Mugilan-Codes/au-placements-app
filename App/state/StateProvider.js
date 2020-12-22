// Inspired by [Phone-Store by trujic1000](https://github.com/trujic1000/phone-store/blob/master/src/global-state/state.js)

import React, {cloneElement} from 'react';

// reduceRight works in reverse as opposed to reduce
// kids = accumulator, parent = currentValue
const ProviderComposer = ({contexts, children}) => {
  return contexts.reduceRight(
    (kids, parent) => cloneElement(parent, {children: kids}),
    children,
  );
};

const StateProvider = ({children}) => {
  return <ProviderComposer>{children}</ProviderComposer>;
};

export default StateProvider;
