"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import type { Nullable } from "@schemas/common";

import type { ModalPropsType } from "@stores/modalStore";
import { useModalStore } from "@stores/modalStore";

export default function ModalContainer() {
	const { modals, close } = useModalStore();
	const [portal, setPortal] = useState<Nullable<Element>>(null);

	useEffect(() => {
		setPortal(document.getElementById("modal"));
	}, []);

	return (
		portal &&
		createPortal(
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
			portal,
		)
	);
}
