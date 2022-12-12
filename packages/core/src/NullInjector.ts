import { Token } from './token';
import { NullInjectorError } from './NullInjectorError';
import { Injector } from './Injector';
import { Provider } from './Provider';
import { StaticInjector } from './StaticInjector';

export class NullInjector extends Injector {

	static readonly instance = new NullInjector();

	protected constructor() {
		super();
	}

	get<T>(token: Token<T>): T {
		throw new NullInjectorError(token);
	}

	createChildInjector(providers: Array<Provider<unknown>>): Injector {
		return new StaticInjector(this, providers);
	}
}
