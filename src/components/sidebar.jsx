import { useLocation } from "react-router-dom";
import SidebarItem from "./sidebar_item";
import ProfileCard from "./profile_card";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import ButtonCommon from "../commons/button.common";
import { logoutService } from "../services/auth.service";
import { setLockService, setResultService, setVotingTimeService } from "../services/lock.service";
import { saveLockAction } from "../actions/lock.action";
import moment from "moment";



const Sidebar = ({ isSideBarOpen, handleCollapse }) => {
  const location = useLocation();
  const lock = useSelector(state => state.lock);
  const user = useSelector(state => state.user);
  const [resultHour, setResultHour] = useState(0);
  const [resultMinute, setResultMinute] = useState(0)
  let hours = [];
  let minutes = [];

  const pages = user?.role === 'admin' ? ['/', '/dashboard', '/dashboard/misses', '/dashboard/categories', '/dashboard/users', '/result'] : ['/', '/category', '/result', '/contact']

  for (let i = 1; i <= 24; i++) {
    if (i >= new Date().getHours()) {
      hours.push(i)
    }
  }
  for (let i = 0; i < 59; i++) {
    minutes.push(i)
  }

  // useEffect(() => {
  //   setResultHour(moment(lock?.votingTime).hours())
  //   setResultMinute(moment(lock?.votingTime).minutes())
  // }, [])

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
    saveLockAction({ ...lock, isLock: !lock?.isLock })
    setLockService()
  }

  const handleResultToggle = () => {
    saveLockAction({ ...lock, result: !lock?.result })
    setResultService()
  }

  return (
    <div
      className={`${isSideBarOpen &&
        'max-xl:fixed max-xl:inset-0 max-xl:z-40 max-xl:items-center max-xl:justify-center max-xl:bg-[#00000040] max-xl:transition-all'
        }`}
      onClick={handleCollapse}
    >

      <div
        className={`
          scrollbar-hide bg-secondary relative flex h-screen flex-col justify-between p-5 transition-all max-xl:fixed
          ${isSideBarOpen ? '-ml-0' : '-ml-[280px]'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <img src="/logo_long.png" className="mb-5 w-40 xl:hidden" />
        <div className="flex-1">
          <ul className="relative space-y-4 pb-4 pt-2 text-sm">
            {
              !location.pathname.includes('/miss/') && !location.pathname.includes('/miss-detail/') && (
                <div
                  className="absolute h-9 w-full rounded-md bg-primary transition-all"
                  style={{ top: calculateSideBarItemActive }}
                />
              )
            }
            <SidebarItem
              title="Home"
              url="/"
              icon="fa-solid fa-home"
              handleCollapse={handleCollapse}
            />

            {
              user?.role === "admin" && (
                <>
                  <SidebarItem
                    title="Dashboard"
                    url="/dashboard"
                    icon="fa-solid fa-sliders"
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
                    icon="fa-solid fa-list"
                    handleCollapse={handleCollapse}
                  />
                  <SidebarItem
                    title="Users"
                    url="/dashboard/users"
                    icon="fa-solid fa-users"
                    handleCollapse={handleCollapse}
                  />
                  <SidebarItem
                    title="View Result"
                    url="/result"
                    icon="fa-solid fa-trophy"
                    handleCollapse={handleCollapse}
                  />
                  <div className="mt-2 px-5 pb-5 pt-3 bg-white rounded-lg shadow-xl">
                    <p className="text-primary font-semibold mb-3">Add Voting Time</p>
                    <div className="flex items-center justify-center">
                      <input
                        name="hours"
                        className="bg-transparent text-xl appearance-none outline-none w-10"
                        value={resultHour}
                        onChange={(e) => setResultHour(e.target.value)}
                        type="number"
                      />
                      <span className="text-xl mx-3">:</span>
                      <input
                        name="minutes"
                        className="bg-transparent text-xl appearance-none outline-none mr-4 w-10"
                        value={resultMinute}
                        onChange={e => setResultMinute(e.target.value)}
                        type="number"
                      />
                      <div>
                        <ButtonCommon onClick={() => setVotingTimeService({ hours: Number(resultHour), minutes: Number(resultMinute) })}>Add</ButtonCommon>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 mt-3 justify-center">
                    <p className="text-primary mb-0">Lock:</p>
                    <input type="checkbox" className="toggle toggle-primary toggle-sm" checked={lock?.isLock} onChange={() => handleLockToggle()} />
                  </div>
                </>
              )
            }
            {
              user?.role === "user" && (
                <>
                  <SidebarItem
                    title="Category"
                    url="/category"
                    icon="fa-solid fa-layer-group"
                    handleCollapse={handleCollapse}
                  />
                  <SidebarItem
                    title="View Result"
                    url="/result"
                    icon="fa-solid fa-trophy"
                    handleCollapse={handleCollapse}
                  />
                  <SidebarItem
                    title="Contact Us"
                    url="/contact"
                    icon="fa-solid fa-headset"
                    handleCollapse={handleCollapse}
                  />
                </>
              )
            }





          </ul>
        </div>

        {/*
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
        */}


      </div>
    </div>
  )
}

export default Sidebar;
