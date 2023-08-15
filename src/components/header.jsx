import { useSelector } from "react-redux";

const Header = ({ handleCollapse }) => {

  return (
    <div className="navbar bg-base-100 text-primary py-2 sticky top-0">
      <div className="navbar-start">
        <div className="btn btn-ghost btn-circle text-2xl" onClick={() => handleCollapse()}>
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
      <div className="navbar-center">
        <img src="./logo_long.png" className="h-[70px]" />
      </div>

    </div>
  )
}

export default Header;
