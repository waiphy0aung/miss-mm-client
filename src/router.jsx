import { useSelector } from 'react-redux/es/exports';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/login'
import Register from './pages/register';
import { Cookies } from 'react-cookie';
import RouteGuard from './route_guard';
import { useEffect, useMemo, useState } from 'react';
import Home from './pages/home';
import { loginWithTokenService, logoutService } from './services/auth.service';
import DashboardHeader from './components/dashboard/header';
import Dashboard from './pages/dashboard/dashboard';
import Sidebar from './components/sidebar';
import MissList from './pages/dashboard/miss-list';
import CategoryList from './pages/dashboard/categories';
import { getCategoriesServices } from './services/category.service';
import { getMissesService } from './services/miss.services';
import CreateMiss from './pages/dashboard/miss-create';
import UpdateMiss from './pages/dashboard/miss-update';
import Miss from './pages/miss';
import { getLockService } from './services/lock.service';
import ButtonCommon from './commons/button.common';
import ResultPage from './pages/result';

const Router = () => {
  const cookie = new Cookies()
  const lock = useSelector(state => state.lock);
  const user = useSelector(state => state.user)
  const token = cookie.get('token')
  const { pathname } = useLocation();
  const isUserLogin = useMemo(() => !!user.isLogin, [user.isLogin]);
  const role = useMemo(() => user.role, [user.role])
  const [loading, setLoading] = useState(true);
  const [isSideBarOpen, setIsSideBarOpen] = useState(window.matchMedia('(max-width: 1280px)').matches ? false : true);

  useEffect(() => {
    if (token) {
      setLoading(true)
      loginWithTokenService(async () => {
        await getLockService()
        await getMissesService();
        await getCategoriesServices();
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [])

  const handleCollapse = () => {
    setIsSideBarOpen((preState) => !preState);
  };

  if (lock?.isLock && role === 'user' && isUserLogin) return (
    <div className="h-screen w-screen flex flex-col justify-center items-center space-y-3">
      <img src="/logo_long.png" />
      <p className='font-semibold'>The match hasn't started yet</p>
      <div>
        <ButtonCommon onClick={() => logoutService()}>Logout <i className="fa-solid fa-right-from-bracket"></i></ButtonCommon>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex">
      {isUserLogin && pathname.startsWith('/dashboard') && <Sidebar
        handleCollapse={handleCollapse}
        isSideBarOpen={isSideBarOpen}
      />}
      <div className="h-screen w-full flex-1 overflow-y-scroll scrollbar-hide">
        {isUserLogin && window.matchMedia('(max-width: 1280px)').matches && pathname.startsWith('/dashboard') && <DashboardHeader handleCollapse={handleCollapse} />}
        <Routes>
          <Route
            path="/login"
            element={
              <RouteGuard
                isUserLogin={isUserLogin}
                role={role}
              >
                <Login />
              </RouteGuard>
            }
          />
          <Route
            path="/register"
            element={
              <RouteGuard
                isUserLogin={isUserLogin}
                role={role}
              >
                <Register />
              </RouteGuard>
            }
          />
          <Route
            path="/"
            element={
              <RouteGuard
                isUserLogin={isUserLogin}
                role={role}
              >
                <Home />
              </RouteGuard>
            }
          />
          <Route
            path="/miss/:slug"
            element={
              <RouteGuard
                isUserLogin={isUserLogin}
                role={role}
              >
                <Miss />
              </RouteGuard>
            }
          />
          <Route
            path="/result"
            element={
              <RouteGuard
                isUserLogin={isUserLogin}
                role={role}
              >
                <ResultPage />
              </RouteGuard>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RouteGuard
                isUserLogin={isUserLogin}
                role={role}
              >
                <Dashboard />
              </RouteGuard>
            }
          />
          <Route
            path="/dashboard/misses"
            element={
              <RouteGuard
                isUserLogin={isUserLogin}
                role={role}
              >
                <MissList />
              </RouteGuard>
            }
          />
          <Route
            path="/dashboard/misses/create"
            element={
              <RouteGuard
                isUserLogin={isUserLogin}
                role={role}
              >
                <CreateMiss />
              </RouteGuard>
            }
          />
          <Route
            path="/dashboard/misses/update"
            element={
              <RouteGuard
                isUserLogin={isUserLogin}
                role={role}
              >
                <UpdateMiss />
              </RouteGuard>
            }
          />
          <Route
            path="/dashboard/categories"
            element={
              <RouteGuard
                isUserLogin={isUserLogin}
                role={role}
              >
                <CategoryList />
              </RouteGuard>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Router;
