const DashboardHeader = ({ handleCollapse }) => {

  return (
    <div className="navbar bg-base-100 text-primary py-2 sticky top-0 z-[30]">
      <div className="navbar-start flex items-center">
        <div className="btn btn-ghost btn-circle text-2xl" onClick={() => handleCollapse()}>
          <i className="fa-solid fa-bars"></i>
        </div>
        <img src="/logo_long.png" className="h-[50px]" />
      </div>
      <div className="navbar-center max-sm:hidden">
        <img src="/logo_long.png" className="h-[50px] xl:h-[70px]" />
      </div>

    </div>
  )
}

export default DashboardHeader;
