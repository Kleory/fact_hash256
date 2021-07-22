import React from 'react';

import ArrStore from './Array';

const storesContext = React.createContext({
  ArrStore,
});

export const useStores = () => React.useContext(storesContext);
