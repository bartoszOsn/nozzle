import { NullInjector } from '../src/NullInjector';
import { InjectionToken, useValue } from '../src';
import { StaticInjector } from '../src/StaticInjector';

describe('NullInjector', () => {
	const injector = NullInjector.instance;

	describe('get', () => {
		// TODO: uncomment when multiInjection is working
		// it('should return empty array when given MultiInjectionToken', () => {
		// 	const token = new MultiInjectionToken<string>('token');
		//
		// 	expect(injector.get(token)).toEqual([]);
		// });

		it('should throw error when given InjectionToken', () => {
			const token = new InjectionToken<string>('token');

			expect(() => injector.get(token)).toThrowError();
		});

		it('should throw error when given ServiceConstructor', () => {
			class Service {}

			expect(() => injector.get(Service)).toThrowError();
		});
	});

	describe('createChildInjector', () => {
		it('should return StaticInjector', () => {
			const token = new InjectionToken<string>('token');
			const value = 'value';

			const child = injector.createChildInjector([useValue(token, value)]);

			expect(child).toBeInstanceOf(StaticInjector);
			expect(child.get(token)).toBe(value);
		});
	});
});
