import type { StateCreator } from "zustand";
import type { PersistOptions } from "zustand/middleware";
import { createJSONStorage, persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

import { useShallow } from "@hooks/useShallow";

type ThemeMode = "light" | "dark";
interface ThemeStoreType {
	mode: ThemeMode;
	setMode: (mode: ThemeMode) => void;
}

interface PersistThemeStoreType {
	(
		config: StateCreator<ThemeStoreType>,
		options: PersistOptions<ThemeStoreType>,
	): StateCreator<ThemeStoreType>;
}

const store = createWithEqualityFn<ThemeStoreType>(
	(persist as PersistThemeStoreType)(
		(set) => ({
			mode: "light",
			setMode: (mode) => set({ mode }),
		}),

		{
			name: "boiler-plage-front-theme",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export const useThemeStore = <T extends keyof ThemeStoreType>(keys: T[]) => {
	return useShallow(store, keys);
};
