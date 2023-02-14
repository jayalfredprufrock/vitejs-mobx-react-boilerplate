import { createContext, useContext } from 'react';
import { RootStore, RootStores } from './RootStore';

// only the App component should access this instance directly
// all other components should leverage the useStores hook
export const rootStoreInstance = new RootStore();
export const rootStoresContext = createContext<RootStores>(rootStoreInstance.stores);
export const useStores = (): RootStores => useContext(rootStoresContext);
