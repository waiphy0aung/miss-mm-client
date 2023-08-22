import { Navigate, useLocation } from 'react-router-dom';

const RouteGuard = ({ isUserLogin,role,children }) => {
	const { pathname } = useLocation();

  if(!isUserLogin && (pathname === "/login" || pathname === "/register")) return children;
  else if (!isUserLogin && (pathname !== '/login')) return <Navigate to="/login" />;
	else if (isUserLogin && (pathname === '/login' || pathname === '/register' || (role !== "admin" && pathname.includes("dashboard")))) return <Navigate to="/" />;

	return children;
};

export default RouteGuard;
