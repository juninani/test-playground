import type { ModalPropsType } from "@stores/modalStore";

import { ModalBtnWrapper, ModalContent, ModalTitle, ModalWrapper } from "../Items";

interface Props extends ModalPropsType {
	message: string;
}
export default function _AlertModal({ onSubmit, message }: Props) {
	return (
		<ModalWrapper>
			<ModalTitle title="알림" />
			<ModalContent>{message || "message"}</ModalContent>
			<ModalBtnWrapper>
				<button onClick={onSubmit}>확인</button>
			</ModalBtnWrapper>
		</ModalWrapper>
	);
}
