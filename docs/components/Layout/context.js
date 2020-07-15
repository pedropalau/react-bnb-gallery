import { createContext } from 'react';

const LayoutContext = createContext({
  navigationOpened: false,
});

const LayoutContextProvider = LayoutContext.Provider;
const LayoutContextConsumer = LayoutContext.Consumer;

export default LayoutContext;

export {
  LayoutContextProvider,
  LayoutContextConsumer,
};
