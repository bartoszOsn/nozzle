import { Token, tokenToString } from './token';

export class NullInjectorError extends Error {
	constructor(public readonly token: Token<unknown>) {
		super(`No provider for ${tokenToString(token)}!`);
	}
}