import { Token } from './token';
import { Provider } from './Provider';

export abstract class Injector {
	abstract get<T>(token: Token<T>): T;
	abstract createChildInjector(providers: Array<Provider<unknown>>): Injector;
}
