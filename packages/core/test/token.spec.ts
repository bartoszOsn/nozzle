import { InjectionToken, tokenToString } from '../src';

describe('tokenToString', () => {
	it('should return proper name of InjectionToken', () => {
		const name = 'token';
		const token = new InjectionToken(name);

		expect(tokenToString(token)).toBe(name);
	});

	it('should return proper name of ServiceConstructor', () => {
		class Service {}

		expect(tokenToString(Service)).toBe(Service.name);
	});
});