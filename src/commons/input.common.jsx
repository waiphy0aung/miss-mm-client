const InputCommon = ({
	id,
	placeholder,
	value,
	label,
	type,
	error,
	className,
	onClick,
	onChange,
}) => {
	return (
		<div className={`${label || error ? 'space-y-2' : ''}`}>
			{label && (
				<label
					htmlFor={id}
					className="cursor-pointer select-none font-semibold"
				>
					{label}
				</label>
			)}
			<div className="relative">
				<input
					id={id}
					type={type}
					placeholder={placeholder || ''}
					className={`
          input-bordered input w-full focus:outline-none
          ${type === 'color' && 'h-[50px] px-2 py-1'}
          ${error ? 'border-red-500' : 'border-black'} 
          ${className ?? ''}
        `}
					value={value}
					onClick={onClick}
					onChange={onChange}
				/>
			</div>

			{error && <div className="text-xs text-red-500">{error}</div>}
		</div>
	);
};

export default InputCommon;
