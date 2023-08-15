import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SidebarItem = ({title,url,icon, handleCollapse}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`${url}`);
    if (window.matchMedia('(max-width: 1280px)').matches) handleCollapse();
  };

  const isActive = useMemo(() => {
		return location.pathname === url;
	}, [location.pathname, url]);

  return (
    <li className="relative z-20 flex select-none items-center justify-center rounded">
      <button
        onClick={handleClick}
        className={`
					flex w-40 items-center space-x-3 rounded-lg p-2 px-6 outline-none 
					${isActive ? 'text-white' : 'text-primary'} 
				`}
      >
        <i className={icon}></i>
        <span className="whitespace-nowrap">{title}</span>
      </button>
    </li>
  )
}

export default SidebarItem
