import { FC, useLayoutEffect, useState } from 'react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import { configure } from 'mobx';
import { Observer } from 'mobx-react-lite';
import { Routes } from './pages/Routes';
import { rootStoreInstance, rootStoresContext, useStores } from './stores';

// this makes changing observable state outside of actions
// strictly forbidden which encourages a more uni-directional
// data flow and prevents common foot guns
configure({
    enforceActions: 'always',
});

const history = rootStoreInstance.stores.routerStore.observeHistory(createBrowserHistory());

export const App: FC = () => {
    const { appStore } = useStores();

    const [state, setState] = useState({
        action: history.action,
        location: history.location,
    });

    useLayoutEffect(() => history.listen(setState), []);

    return (
        <rootStoresContext.Provider value={rootStoreInstance.stores}>
            <Router location={state.location} navigator={history} navigationType={state.action}>
                <Observer>
                    {() => {
                        return (
                            <div className={`container theme-${appStore.theme}`}>
                                <Routes />
                            </div>
                        );
                    }}
                </Observer>
            </Router>
        </rootStoresContext.Provider>
    );
};

export default App;
