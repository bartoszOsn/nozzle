import { Token } from './token';
import { Scope } from './Scope';
import { Injector } from './Injector';
import { ServiceConstructor } from './ServiceConstructor';

export class Provider<T> {
	constructor(
		private provide: Token<T>,
		private factory: (injector: Injector) => T,
		private scope: Scope = Scope.Singleton
	) {
	}

	asSingleton(): this {
		this.scope = Scope.Singleton;
		return this;
	}

	asTransient(): this {
		this.scope = Scope.Transient;
		return this;
	}

	getProvide(): Token<T> {
		return this.provide;
	}

	getFactory(): (injector: Injector) => T {
		return this.factory;
	}

	getScope(): Scope {
		return this.scope;
	}
}

export function useType<T>(constructor: ServiceConstructor<T>): Provider<T> {
	return useClass(constructor, constructor);
}

export function useValue<T>(provide: Token<T>, value: T): Provider<T> {
	return new Provider<T>(provide, () => value);
}

export function useClass<T>(provide: Token<T>, constructor: ServiceConstructor<T>): Provider<T> {
	return new Provider<T>(provide, injector => new constructor(injector));
}

export function useExisting<T>(provide: Token<T>, existing: Token<T>): Provider<T> {
	return new Provider<T>(provide, injector => injector.get(existing));
}

export function useFactory<T>(provide: Token<T>, factory: (injector: Injector) => T): Provider<T> {
	return new Provider(provide, factory);
}