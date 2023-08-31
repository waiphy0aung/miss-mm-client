import { useSelector } from "react-redux"
import { logoutService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import ButtonCommon from "../commons/button.common";
import {faker} from "@faker-js/faker"

const Header = ({ handleCollapse, isUserLogin }) => {
  const navigate = useNavigate();
  const categories = useSelector(state => state.categories);
  const user = useSelector(state => state.user);

  return (
    <div className="navbar bg-secondary sticky top-0 py-3 px-5 z-30">
      <div className="navbar-start">
        <div className="cursor-pointer" onClick={() => handleCollapse()}>
          <i className="fa-solid fa-bars text-primary text-2xl"></i>
        </div>
      </div>
      <div className="navbar-center">
        <img src="/logo_long.png" className="xl:h-[80px] h-[50px]" />
      </div>
      <div className="navbar-end space-x-3">
        {
          isUserLogin ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="rounded-full flex items-center justify-center space-x-2 p-2 shadow-lg bg-secondary">
                {
                  !window.matchMedia('(max-width: 1280px)').matches && <p className="font-semibold mb-0 hidden xl:block">{user.name}</p>
                }
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img src={faker.image.avatarGitHub()} />
                  </div>
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-40 p-2 shadow bg-base-100 rounded-box w-52">
                <li><a className="font-semibold xl:hidden">{user.name}</a></li>
                <li><a onClick={() => logoutService()}>Logout <i className="fa-solid fa-arrow-right-from-bracket"></i></a></li>
              </ul>
            </div>
          ) : (
            <div className="">
              <ButtonCommon onClick={() => navigate('/login')}>Login</ButtonCommon>
            </div>
          )
        }


      </div>
    </div>
  )
}

export default Header
