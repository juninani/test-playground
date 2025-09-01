import { createPortal } from "react-dom";

import type { ModalPropsType } from "./store";
import { useModalStore } from "./store";

export type { ModalPropsType };

export default function ModalContainer() {
	const { modals, close } = useModalStore();

	return createPortal(
		modals.map((m) => {
			const { Component, props, key } = m;
			const {
				onSubmit = () => {},
				onClose = () => {},
				onCancel = () => {},
				...restProps
			} = props;

			const handleClose = async () => {
				await onClose?.();
				close(key);
			};

			const handleSubmit = async (_props?: ModalPropsType) => {
				await onSubmit?.(_props);
				close(key);
			};

			const handleCancel = async () => {
				await onCancel?.();
				close(key);
			};

			return (
				<Component
					key={key}
					onSubmit={handleSubmit}
					onClose={handleClose}
					onCancel={handleCancel}
					{...restProps}
				/>
			);
		}),
		document.querySelector("body")!,
	);
}
