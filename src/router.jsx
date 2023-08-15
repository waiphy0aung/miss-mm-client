import { useSelector } from 'react-redux/es/exports';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/login'
import Register from './pages/register';
import { Cookies } from 'react-cookie';
import RouteGuard from './route_guard';
import { useEffect, useMemo, useState } from 'react';
import Home from './pages/home';
import { loginWithTokenService } from './services/auth.service';

const Router = () => {
  const cookie = new Cookies()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const token = cookie.get('token')
  const isUserLogin = useMemo(() => !!user?.isLogin, [user?.isLogin]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setLoading(true)
      loginWithTokenService(navigate,() => setLoading(false))
    }
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="h-screen w-full flex-1 overflow-y-scroll">
        <Routes>
          <Route
            path="/login"
            element={
              <RouteGuard
                isUserLogin={isUserLogin}
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
              >
                <Home />
              </RouteGuard>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Router;
