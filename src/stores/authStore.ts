import type { StateCreator } from "zustand";
import type { PersistOptions } from "zustand/middleware";
import { createJSONStorage, persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

import type { Nullable } from "@schemas/common";

import { useShallow } from "@hooks/useShallow";

interface AuthStoreType {
	accessToken: Nullable<string>;
	refreshToken: Nullable<string>;
	setAuth: (accessToken: string, refreshToken: string) => void;
	clear: () => void;
}

interface PersistAuthStoreType {
	(
		config: StateCreator<AuthStoreType>,
		options: PersistOptions<AuthStoreType>,
	): StateCreator<AuthStoreType>;
}

const store = createWithEqualityFn<AuthStoreType>(
	(persist as PersistAuthStoreType)(
		(set) => ({
			accessToken: null,
			refreshToken: null,

			setAuth: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
			clear: () => set({ accessToken: null, refreshToken: null }),
		}),

		{
			name: "boiler-plage-front-auth",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export const useAuthStore = <T extends keyof AuthStoreType>(keys: T[]) => {
	return useShallow(store, keys);
};
