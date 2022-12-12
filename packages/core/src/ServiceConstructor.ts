import { Injector } from './Injector';

export type ServiceConstructor<T> = new (injector: Injector) => T;
