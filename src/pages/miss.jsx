import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MissCard from "../components/miss_card";
import { logoutService } from "../services/auth.service";
import { useEffect, useState } from "react";

const Miss = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const { slug } = useParams();
  const user = useSelector(state => state.user);
  const misses = useSelector(state => state.misses)
  const categories = useSelector(state => state.categories);
  const category = categories.find(v => v.slug === slug);
  const isVoted = misses.find(v => v.isVote[slug]);
  const [loading, setLoading] = useState(true)

  const handleLogout = async () => {
    logoutService()
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [location.pathname])

  return (
    <>
      <div className="navbar bg-secondary sticky top-0 z-[40]">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabIndex={1} className="menu menu-sm dropdown-content mt-3 z-40 p-2 shadow bg-base-100 rounded-box w-52">
              {
                categories?.map(category => {
                  return (
                    <li key={category._id}><a onClick={() => navigate('/miss/' + category.slug)}>{category.name}</a></li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <img src="/logo_long.png" className="xl:h-[80px] h-[50px]" />
        </div>
        <div className="navbar-end space-x-3">
          {user.role === "admin" && <button className="btn btn-primary max-sm:hidden rounded-full" onClick={() => navigate('/dashboard')}>Dashboard</button>}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="rounded-full flex items-center justify-center space-x-2 p-2 shadow-lg">
              {
                !window.matchMedia('(max-width: 1280px)').matches && <p className="font-semibold mb-0 hidden xl:block">{user.name}</p>
              }
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img src={user.profile} />
                </div>
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-40 p-2 shadow bg-base-100 rounded-box w-52">
              <li><a className="font-semibold xl:hidden">{user.name}</a></li>
              <li><a className="xl:hidden" onClick={() => navigate('/dashboard')}>Dashboard</a></li>
              <li><a onClick={() => handleLogout()}>Logout <i className="fa-solid fa-arrow-right-from-bracket"></i></a></li>
            </ul>
          </div>

        </div>
      </div>

      <div className="px-10">
        <div className="text-sm breadcrumbs my-4">
          <ul>
            <li className="text-primary"><a onClick={() => navigate('/')}>Home</a></li>
            <li className="text-primary"><a>Miss</a></li>
            <li>{category.name}</li>
          </ul>
        </div>

        {
          loading ? (
            <div className="flex h-full w-full items-center justify-center mt-[100px]">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
            <div className="grid sm:grid-cols-1 xl:grid-cols-3 gap-3">
              {
                misses?.map(miss => {
                  return <MissCard key={miss._id} miss={miss} category={category} isVoted={isVoted} />
                })
              }
            </div>
          )
        }


      </div>
    </>
  )
}

export default Miss;
