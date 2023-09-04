import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SelectCategory = () => {
  const navigate = useNavigate()
  const lock = useSelector(state => state.lock);
  const categories = useSelector(state => state.categories);
  const misses = useSelector(state => state.misses);
  const { role } = useSelector(state => state.user);
  console.log(lock, role)

  return (
    <div className="flex flex-col items-center py-10 space-y-[50px]">
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
    </div>

  )
}

export default SelectCategory;
