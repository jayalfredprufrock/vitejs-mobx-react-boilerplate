import { action, makeObservable, observable } from 'mobx';
import { BaseStore } from '../BaseStore/BaseStore';

export class AppStore extends BaseStore {
    @observable theme: 'light' | 'dark' = 'light';

    constructor() {
        super();
        makeObservable(this);
    }

    @action
    toggleTheme(theme?: 'light' | 'dark'): void {
        this.theme = theme ?? (this.theme === 'light' ? 'dark' : 'light');
    }
}
