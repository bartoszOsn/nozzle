import { Provider } from './Provider';
import { Injector } from './Injector';
import { Token } from './token';
import { Scope } from './Scope';

export class StaticInjector extends Injector {

	private readonly parent: Injector;
	private readonly providers: Map<Token<unknown>, Provider<unknown>> = new Map();

	private readonly singletonCache: Map<Token<unknown>, unknown> = new Map();

	constructor(
		parent: Injector,
		providers: Array<Provider<unknown>> = [],
	) {
		super();
		this.parent = parent;
		for (const provider of providers) {
			this.providers.set(provider.getProvide(), provider);
		}
	}

	get<T>(token: Token<T>): T {
		const provider = this.getProvider(token);

		if (!provider) {
			return this.parent.get(token);
		}

		if (provider.getScope() === Scope.Singleton && this.singletonCache.has(token)) {
			return this.singletonCache.get(token) as T;
		}

		return this.resolve(provider);
	}

	createChildInjector(providers: Array<Provider<unknown>>): Injector {
		return new StaticInjector(this, providers);
	}

	private resolve<T>(provider: Provider<T>): T {
		const value = provider.getFactory()(this);
		if (provider.getScope() === Scope.Singleton) {
			this.singletonCache.set(provider.getProvide(), value);
		}
		return value;
	}

	private getProvider<T>(token: Token<T>): Provider<T> | undefined {
		return this.providers.get(token) as Provider<T> | undefined;
	}
}