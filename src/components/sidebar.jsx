import { useLocation } from "react-router-dom";
import SidebarItem from "./sidebar_item";
import ProfileCard from "./profile_card";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import ButtonCommon from "../commons/button.common";
import { logoutService } from "../services/auth.service";

const pages = ['/dashboard', '/dashboard/misses', '/dashboard/categories']

const Sidebar = ({ isSideBarOpen, handleCollapse }) => {
  const location = useLocation();

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
    await logoutService()
    window.location.reload()
  }

  return (
    <div
      className={`${isSideBarOpen &&
        'max-xl:fixed max-xl:inset-0 mr-5 max-xl:z-40 max-xl:items-center max-xl:justify-center max-xl:bg-[#00000040] max-xl:transition-all'
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
          </ul>
        </div>

        <div className="w-full space-y-4">
          <ProfileCard
            name={user.name}
            profile={user.profile}
            role={user.role}
          />
          <ButtonCommon
            children="Logout"
            onClick={() => handleLogout()}
            className="w-full"
          />
        </div>

      </div>
    </div>
  )
}

export default Sidebar;
