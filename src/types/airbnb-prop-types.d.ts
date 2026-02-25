declare module 'airbnb-prop-types' {
	type PropTypeMap = Record<string, import('prop-types').Validator<unknown>>;

	export function forbidExtraProps<T extends PropTypeMap>(propTypes: T): T;
	export const nonNegativeInteger: import('prop-types').Validator<number>;
}
