import { AppStore } from '../AppStore/AppStore';
import { rootServiceInstance, RootServices } from '../../services/RootService';
import { RouterStore } from '../RouterStore/RouterStore';

export type RootStores = {
    appStore: AppStore;
    routerStore: RouterStore;
};

export interface OnInitialized {
    onInitialized(rootStores: RootStores, rootServices: RootServices): void;
}

export class RootStore {
    readonly stores: RootStores;

    constructor() {
        this.stores = {
            appStore: new AppStore(),
            routerStore: new RouterStore(),
        };

        for (const store of Object.values(this.stores)) {
            if (isInitializable(store)) {
                store.onInitialized(this.stores, rootServiceInstance.services);
            }
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isInitializable = (arg: any): arg is OnInitialized => {
    return arg.onInitialized !== undefined;
};
