import type { ComponentType } from "react";

import type { ModalPropsType } from "./store";
import { useModalStoreClose, useModalStoreOpen } from "./store";

export default function useModal() {
	const open = useModalStoreOpen();
	const close = useModalStoreClose();

	const openModal = <P extends ModalPropsType>(Component: ComponentType<P>, props?: P) => {
		open(Component, props ? props : {});
	};

	const closeModal = (key: string) => {
		close(key);
	};

	return { openModal, closeModal };
}
