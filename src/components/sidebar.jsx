import { useLocation } from "react-router-dom";
import SidebarItem from "./sidebar_item";
import ProfileCard from "./profile_card";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import ButtonCommon from "../commons/button.common";
import { logoutService } from "../services/auth.service";
import { setLockService } from "../services/lock.service";
import { setLockAction } from "../actions/lock.action";

const pages = ['', '/dashboard', '/dashboard/misses', '/dashboard/categories']

const Sidebar = ({ isSideBarOpen, handleCollapse }) => {
  const location = useLocation();
  const lock = useSelector(state => state.lock);
  const user = useSelector(state => state.user);

  const calculateSideBarItemActive = useMemo(() => {
    let topPx = 24;
    for (const page of pages) {
      if (page === '/dashboard/misses' && (location.pathname.includes('create') || location.pathname.includes('update'))) break;
      if (location.pathname === page) break;
      else topPx += 52;
    }
    return topPx;
  }, [location.pathname]);

  const handleLogout = async () => {
    logoutService()
  }

  const handleLockToggle = () => {
    setLockAction(!lock)
    setLockService()
  }

  return (
    <div
      className={`${isSideBarOpen &&
        'max-xl:fixed max-xl:inset-0 xl:mr-5 max-xl:z-40 max-xl:items-center max-xl:justify-center max-xl:bg-[#00000040] max-xl:transition-all'
        }`}
      onClick={handleCollapse}
    >

      <div
        className={`
          scrollbar-hide bg-secondary relative flex h-screen flex-col justify-between px-10 py-5 transition-all max-xl:fixed
          ${isSideBarOpen ? '-ml-0' : '-ml-[240px]'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <img src="/logo_long.png" className="mb-5 w-40" />
        <div className="flex-1">
          <ul className="relative space-y-4 pb-4 pt-2 text-sm">
            <div
              className="absolute h-9 w-full rounded-md bg-primary transition-all"
              style={{ top: calculateSideBarItemActive }}
            />
            <SidebarItem
              title="Home"
              url="/"
              icon="fa-solid fa-arrow-left"
              handleCollapse={handleCollapse}
            />
            <SidebarItem
              title="Dashboard"
              url="/dashboard"
              icon="fa-solid fa-home"
              handleCollapse={handleCollapse}
            />
            <SidebarItem
              title="Misses"
              url="/dashboard/misses"
              icon="fa-solid fa-list"
              handleCollapse={handleCollapse}
            />
            <SidebarItem
              title="Caetgories"
              url="/dashboard/categories"
              icon="fa-solid fa-layer-group"
              handleCollapse={handleCollapse}
            />
            <div className="flex items-center space-x-3 mt-3 justify-center">
              <p className="text-primary mb-0">Lock:</p>
              <input type="checkbox" className="toggle toggle-primary toggle-sm" checked={lock} onChange={() => handleLockToggle()} />
            </div>
          </ul>
        </div>

        <div className="w-full space-y-4">
          <ProfileCard
            name={user.name}
            profile={user.profile}
            role={user.role}
          />
          <ButtonCommon
            onClick={() => handleLogout()}
            className="w-full"
          >
            Logout <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </ButtonCommon>
        </div>

      </div>
    </div>
  )
}

export default Sidebar;
