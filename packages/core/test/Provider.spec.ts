import { InjectionToken, Injector, useClass, useExisting, useFactory, useType, useValue } from '../src';

describe('Provider', () => {
	it('useType', () => {
		class Service {}
		const provider = useType(Service);
		const injector = {} as unknown as Injector;

		expect(provider.getProvide()).toBe(Service);
		expect(provider.getFactory()(injector)).toBeInstanceOf(Service);
	});

	it('useValue', () => {
		const token = new InjectionToken<string>('token');
		const value = 'value';
		const injector: Injector = {} as unknown as Injector;

		const provider = useValue(token, value);

		expect(provider.getProvide()).toBe(token);
		expect(provider.getFactory()(injector)).toBe(value);
	});

	it('useClass', () => {
		class Service {}
		const token = new InjectionToken<Service>('token');
		const injector: Injector = {} as unknown as Injector;

		const provider = useClass(token, Service);

		expect(provider.getProvide()).toBe(token);
		expect(provider.getFactory()(injector)).toBeInstanceOf(Service);
	});

	it('useExisting', () => {
		const value = 'value';
		const token1 = new InjectionToken<string>('token1');
		const token2 = new InjectionToken<string>('token2');
		const injector = {
			get: jest.fn().mockReturnValueOnce(value)
		};

		const provider = useExisting(token1, token2);

		expect(provider.getProvide()).toBe(token1);
		expect(provider.getFactory()(injector as unknown as Injector)).toBe(value);
		expect(injector.get).toBeCalledWith(token2);
	});

	it('useFactory', () => {
		const token = new InjectionToken<string>('token');
		const value = 'value';
		const factory = jest.fn().mockReturnValueOnce(value);
		const injector: Injector = {} as unknown as Injector;

		const provider = useFactory(token, factory);

		expect(provider.getProvide()).toBe(token);
		expect(provider.getFactory()(injector)).toBe(value);
		expect(factory).toBeCalledWith(injector);
	});
});
