import { Injector } from './Injector';
import { inject, InjectionKey, provide } from 'vue';
import { NullInjector } from './NullInjector';
import { Provider } from './Provider';

const key = Symbol('Injector') as InjectionKey<Injector>;

export function useInjector(): Injector {
	return inject(key, NullInjector.instance);
}

export function useConfiguredInjector(providers: Array<Provider<unknown>>): Injector {
	const parentInjector = useInjector();
	const currentInjector = parentInjector.createChildInjector(providers);
	provide(key, currentInjector);

	return currentInjector;
}