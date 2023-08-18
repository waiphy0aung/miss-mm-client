const ButtonCommon = ({ children, className, disabled, isSecondary, onClick }) => {
	return (
		<button
			className={`
        btn w-full whitespace-nowrap normal-case text-white disabled:bg-primary disabled:text-white
        ${isSecondary ? `btn-secondary` : 'btn-primary'} 
        ${className ?? ''}
      `}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default ButtonCommon;
