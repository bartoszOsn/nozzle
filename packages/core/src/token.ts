import { ServiceConstructor } from './ServiceConstructor';

// @ts-expect-error: "'T' is declared but its value is never read."
export class InjectionToken<T> { // eslint-disable-line @typescript-eslint/no-unused-vars
	constructor(public readonly name: string) { }
}

export class MultiInjectionToken<T> extends InjectionToken<Array<T>> {
	constructor(name: string) {
		super(name);
	}
}

export type Token<T> = InjectionToken<T> | ServiceConstructor<T>;

export function tokenToString(token: Token<unknown>): string {
	// I don't know why, but without this check IDE shows error
	if (token instanceof InjectionToken) {
		return token.name;
	} else {
		return token.name;
	}
}
