import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonCommon from "../commons/button.common";
import { logoutService } from "../services/auth.service";

const Home = () => {
  const navigate = useNavigate()
  const categories = useSelector(state => state.categories);
  const misses = useSelector(state => state.misses);
  const { role } = useSelector(state => state.user);

  return (
    <div className="h-screen bg-secondary flex flex-col items-center py-10 space-y-[50px]">
      <div className="">
        <img src="/logo_long.png" className="h-[120px]" />
      </div>
      <p className="text-xl font-semibold">Please Choose Category To Vote</p>
      <div className="grid grid-cols-1 justify-center items-center gap-y-3">
        {
          categories.map(category => {
            const isVoted = misses.find(v => v.isVote[category.slug]);
            return (
              <div className="p-3 px-10 cursor-pointer text-center rounded-full bg-primary text-white transition-all" key={category._id} onClick={() => navigate('/miss/' + category.slug)}>
                {category.name}   {isVoted && <i className="fa-regular fa-circle-check text-success"></i>}
              </div>
            )
          })
        }
      </div>
      {
        role === "admin" && (
          <div className="absolute bottom-5 left-5">
            <ButtonCommon onClick={() => navigate('/dashboard')}>Go to Dashboard</ButtonCommon>
          </div>
        )
      }
      <div className="absolute bottom-5 right-5">
        <ButtonCommon onClick={() => logoutService()}>Logout <i className="fa-solid fa-right-from-bracket"></i></ButtonCommon>
      </div>
    </div>

  )
}

export default Home;
