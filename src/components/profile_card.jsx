const ProfileCard = ({ name, role, profile }) => {
	return (
		<div className="flex w-full items-center rounded-md bg-white p-3 shadow-md">
			<img
				src={profile}
				className="mr-3 h-10 w-10 rounded-full"
			/>
			<div className="space-y-2">
				<p className="text-sm font-bold">{name?.length > 10 ? `${name.split('').slice(0, 8).join('')}...` : name}</p>
				<p className="text-xs font-light">{role}</p>
			</div>
		</div>
	);
};

export default ProfileCard;
