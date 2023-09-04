import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MissCard from "../components/miss_card";
import { logoutService } from "../services/auth.service";
import { useEffect, useState } from "react";
import Header from "../components/header";

const Miss = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const { slug } = useParams();
  const misses = useSelector(state => state.misses)
  const categories = useSelector(state => state.categories);
  const category = categories.find(v => v.slug === slug);
  const isVoted = misses.find(v => v.isVote[slug]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [location.pathname])

  return (
    <>
      <div className="px-5">
        <div className="text-sm breadcrumbs my-4">
          <ul>
            <li className="text-primary"><a onClick={() => navigate('/')}>Home</a></li>
            <li className="text-primary"><a onClick={() => navigate('/category')}>Category</a></li>
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
