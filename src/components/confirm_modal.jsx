import ButtonCommon from "../commons/button.common";
import Modal from "../commons/modal.common";

const ConfirmModal = ({
	text,
	confirmBtnText,
	showModal,
	setShowModal,
	handleConfirm,
}) => {
	return (
		<Modal
			close={() => setShowModal()}
			open={showModal}
		>
			<div className="flex flex-col items-center justify-center gap-y-4">
				<p className="text-xl font-bold">{text}</p>
				<div className="flex items-center justify-center gap-x-3">
					<ButtonCommon
						onClick={setShowModal}
					>
						Cancel
					</ButtonCommon>
					<ButtonCommon onClick={handleConfirm}>{confirmBtnText}</ButtonCommon>
				</div>
			</div>
		</Modal>
	);
};

export default ConfirmModal;
