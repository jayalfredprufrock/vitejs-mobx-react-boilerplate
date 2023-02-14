import { ApiService } from '../../services/ApiService/ApiService';
import { RootServices } from '../../services/RootService';
import { OnInitialized, RootStores } from '../RootStore';
import { AuthStore } from '../AuthStore/AuthStore';
import { AppStore } from '../AppStore/AppStore';
import { ModelStore } from '../ModelStore/ModelStore';
import { AnalyticsStore } from '../AnalyticsStore';
import { RouterStore } from '../RouterStore/RouterStore';
import { LoaderStore } from '../LoaderStore/LoaderStore';

export abstract class BaseStore implements OnInitialized, RootStores, RootServices {
    //services
    services!: RootServices;
    apiService!: ApiService;

    // stores
    stores!: RootStores;
    appStore!: AppStore;
    analyticsStore!: AnalyticsStore;
    modelStore!: ModelStore;
    loaderStore!: LoaderStore;
    authStore!: AuthStore;
    routerStore!: RouterStore;

    onInitialized(stores: RootStores, services: RootServices): void {
        this.stores = stores;
        this.services = services;
        Object.assign(this, services);
        Object.assign(this, stores);
    }
}
