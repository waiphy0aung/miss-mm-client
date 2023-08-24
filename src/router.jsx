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
import UserList from './pages/dashboard/users';
import { getUsersService } from './services/users.service';
import Header from './components/header';
import SelectCategory from './pages/select_category';
import Contact from './pages/contact';
import MissDetail from './pages/miss-detail';

const Router = () => {
  const cookie = new Cookies()
  const lock = useSelector(state => state.lock);
  const user = useSelector(state => state.user)
  const token = cookie.get('token')
  const { pathname } = useLocation();
  const isUserLogin = useMemo(() => !!user.isLogin, [user.isLogin]);
  const role = cookie.get('role')
  const [loading, setLoading] = useState(true);
  const [isSideBarOpen, setIsSideBarOpen] = useState(window.matchMedia('(max-width: 1280px)').matches ? false : true);

  useEffect(() => {
    getLockService()
    if (token) {
      setLoading(true)
      loginWithTokenService(async () => {
        await getMissesService();
        await getCategoriesServices();
        if (role === 'admin') await getUsersService();
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [])

  const handleCollapse = () => {
    setIsSideBarOpen((preState) => !preState);
  };

  if (lock?.isLock && role !== 'admin' && pathname !== "/login" && pathname !== '/register') return (
    <div className="h-screen w-screen flex flex-col justify-center items-center space-y-3">
      <img src="/logo_long.png" />
      <p className='font-semibold'>The match hasn't started yet</p>

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
    <div className="flex" style={{ backgroundImage: `url('/contest-bg.png')` }}>
      {pathname !== '/login' && pathname !== 'register' && <Sidebar
        handleCollapse={handleCollapse}
        isSideBarOpen={isSideBarOpen}
        isUserLogin={isUserLogin}
      />}
      <div className="h-screen w-full flex-1 overflow-y-scroll scrollbar-hide">
        {pathname !== '/login' && pathname !== '/register' && <Header handleCollapse={handleCollapse} isUserLogin={isUserLogin} />}

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
              <Home />
            }
          />
          <Route
            path="/category"
            element={
              <RouteGuard
                isUserLogin={isUserLogin}
                role={role}
              >
                <SelectCategory />

              </RouteGuard>
            }
          />
          <Route
            path="/contact"
            element={
              <RouteGuard
                isUserLogin={isUserLogin}
                role={role}
              >
                <Contact />

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
            path="/miss-detail/:id"
            element={
              <RouteGuard
                isUserLogin={isUserLogin}
                role={role}
              >
                <MissDetail />
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
          <Route
            path="/dashboard/users"
            element={
              <RouteGuard
                isUserLogin={isUserLogin}
                role={role}
              >
                <UserList />
              </RouteGuard>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Router;
