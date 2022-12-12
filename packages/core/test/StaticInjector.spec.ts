import { NullInjector } from '../src/NullInjector';
import { StaticInjector } from '../src/StaticInjector';
import { InjectionToken, useClass, useValue } from '../src';

describe('StaticInjector', () => {
	describe('get', () => {
		it('should return value from parent injector', () => {
			const token = new InjectionToken<string>('token');
			const value = 'value';
			const parent = new StaticInjector(NullInjector.instance, [useValue(token, value)]);
			const child = new StaticInjector(parent);

			const result = child.get(token);

			expect(result).toBe(value);
		});

		it('should return value from own providers', () => {
			const token = new InjectionToken<string>('token');
			const value = 'value';
			const injector = new StaticInjector(NullInjector.instance, [
				useValue(token, value),
			]);

			const result = injector.get(token);

			expect(result).toBe(value);
		});

		it('should return value from own providers even if value is in parent injector', () => {
			const parentToken = new InjectionToken<string>('token');
			const parentValue = 'parent value';
			const parent = new StaticInjector(NullInjector.instance, [ useValue(parentToken, parentValue) ]);
			const childToken = new InjectionToken<string>('token');
			const childValue = 'child value';
			const child = new StaticInjector(parent, [
				useValue(childToken, childValue),
			]);

			const result = child.get(childToken);

			expect(result).toBe(childValue);
		});

		it('should return array of values if given multiprovider', () => {
			// TODO: implement when multiproviders will be implemented
		});

		describe('Scope', () => {
			it('should cache singleton providers', () => {
				class Service {}
				const token = new InjectionToken<Service>('token');
				const injector = new StaticInjector(NullInjector.instance, [
					useClass(token, Service).asSingleton(),
				]);

				const result1 = injector.get(token);
				const result2 = injector.get(token);

				expect(result1).toBeInstanceOf(Service);
				expect(result2).toBeInstanceOf(Service);
				expect(result1).toBe(result2);
			});

			it('should create new instance of transient providers', () => {
				class Service {}
				const token = new InjectionToken<Service>('token');
				const injector = new StaticInjector(NullInjector.instance, [
					useClass(token, Service).asTransient(),
				]);

				const result1 = injector.get(token);
				const result2 = injector.get(token);

				expect(result1).toBeInstanceOf(Service);
				expect(result2).toBeInstanceOf(Service);
				expect(result1).not.toBe(result2);
			});
		});
	});
});
