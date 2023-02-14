import type { History, Location, To } from 'history';
import { action, computed, makeObservable, observable } from 'mobx';
import { BaseStore } from '../BaseStore/BaseStore';

export class RouterStore extends BaseStore {
    @computed get initialized(): boolean {
        return this.location !== undefined;
    }

    @observable.ref location: Location | undefined;

    history!: History;

    @computed get search(): URLSearchParams {
        return new URLSearchParams(this.location?.search);
    }

    @computed get query(): Record<string, string> {
        return Object.fromEntries([...this.search]);
    }

    constructor() {
        super();
        makeObservable(this);
    }

    @action.bound
    observeHistory(history: History): History {
        this.history = history;

        this.setLocation(history.location);

        history.listen(({ location }) => {
            this.setLocation(location);
        });

        return history;
    }

    push(to: To, state?: unknown): void {
        this.history.push(to, state);
    }

    replace(to: To, state?: unknown): void {
        this.history.replace(to, state);
    }

    removeQueryParam(param: string): string | undefined {
        const value = this.search.get(param) || undefined;
        if (value) {
            this.search.delete(param);
            this.history.replace({ search: this.search.toString() });
        }
        return value;
    }

    go(n: number): void {
        this.history.go(n);
    }

    back(): void {
        this.go(-1);
    }

    forward(): void {
        this.go(1);
    }

    @action.bound
    setLocation(location: Location): void {
        this.location = location;
    }
}
