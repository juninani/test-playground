import type { ComponentType } from "react";

import { create } from "zustand";

export type ModalPropsType = {
	onClose?: () => void;
	onSubmit?: (event?: any) => void;
	key?: string;
	[property: string]: any;
};

type ModalType = {
	key: string;
	props: ModalPropsType;
	Component: ComponentType<ModalPropsType>;
};

type ModalStoreType = {
	modals: ModalType[];
	open: (Component: ComponentType<any>, props: ModalPropsType) => void;
	close: (key: string) => void;
	clear: () => void;
};

export const useModalStore = create<ModalStoreType>((set, get) => ({
	modals: [],
	open: (Component: ComponentType<any>, props: ModalPropsType) => {
		const { modals } = get();
		const modal = props.key ? modals.find((m) => m.key === props.key) : null;
		const key = props.key || Date.now().toString();

		if (!modal) {
			set({ modals: [...modals, { Component, props, key }] });
		}
	},
	close: (key: string) => {
		const { modals } = get();
		set({ modals: modals.filter((m) => m.key !== key) });
	},
	clear: () => {
		set({ modals: [] });
	},
}));

export const useModalStoreOpen = () => useModalStore((state) => state.open);
export const useModalStoreClose = () => useModalStore((state) => state.close);
export const useModalStoreClear = () => useModalStore((state) => state.clear);
