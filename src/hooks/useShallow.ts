import type { StoreApi } from "zustand";
import { useShallow as _useShallow } from "zustand/react/shallow";
import type { UseBoundStoreWithEqualityFn } from "zustand/traditional";

export const useShallow = <T, K extends keyof T>(
	store: UseBoundStoreWithEqualityFn<StoreApi<T>>,
	keys: K[],
): Pick<T, K> => {
	return store(
		_useShallow((state) => {
			const result = {} as { [K in keyof T]: T[K] };
			keys.forEach((key) => {
				result[key] = state[key];
			});
			return result;
		}),
	);
};
