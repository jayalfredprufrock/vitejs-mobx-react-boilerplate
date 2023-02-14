import { ApiService } from './ApiService';

export type RootServices = {
    apiService: ApiService;
};

export class RootService {
    readonly services: RootServices;

    constructor() {
        this.services = {
            apiService: new ApiService(),
        };
    }
}

export const rootServiceInstance = new RootService();
