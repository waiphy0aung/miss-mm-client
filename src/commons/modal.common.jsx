const Modal = ({ children, open, className, isStatic, close }) => {
	return (
		<div
			className={`modal ${open && 'modal-open'}`}
			onClick={() => !isStatic && close()}
		>
			<div
				className={`scrollbar-hide modal-box rounded-md ${className ?? ''}`}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
};

export default Modal;
