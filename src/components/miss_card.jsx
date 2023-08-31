import { useNavigate } from "react-router-dom";
import ButtonCommon from "../commons/button.common";
import { voteMissService } from "../services/miss.services";
import { useState } from "react";
import ImageLoader from "react-load-image";

const MissCard = ({ miss, category, isVoted, isDashboard, handleShowDeleteModal }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const handleVote = () => {
    setLoading(true)
    voteMissService(miss, category.id, category.slug, () => {
      setLoading(false)
    })
  }

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl min-h-[300px]">
      <figure>
        <ImageLoader
          src={miss.image}
        >
          <img className="h-[500px] w-full xl:h-full xl:w-[200px] transition-all object-cover" src={miss.image} />
          <div>Error!</div>
          <div className="h-[500px] w-full xl:h-full xl:w-[200px] flex justify-center items-center">
            <span className="loading loading-dots loading-lg text-primary"></span>
          </div>
        </ImageLoader>
      </figure>
      <div className="card-body text-primary bg-secondary">
        <h2 className="card-title">{miss.name}</h2>
        <p>Age: <span className="text-black">{miss.age}</span></p>
        <p>Height: <span className="text-black">{miss.height} cm</span></p>
        <p>Weight: <span className="text-black">{miss.weight} kg</span></p>
        <p>Body Ratio: <span className="text-black">{miss.bust + '" ' + miss.waist + '" ' + miss.hips + '"'}</span></p>
        <p>Address: <span className="text-black">{miss.location}</span></p>
        <p>Hobby: <span className="text-black">{miss.hobby.join(", ")}</span></p>
        <div className="card-actions justify-end flex space-x-3 mt-3">
          {isDashboard ? (
            <>
              <i className="fa-solid fa-edit cursor-pointer" onClick={() => navigate('/dashboard/misses/update?id=' + miss.id)}></i>
              <i className="fa-solid fa-trash text-[red] cursor-pointer" onClick={() => handleShowDeleteModal(miss.id)}></i>
            </>
          ) : (
            <ButtonCommon disabled={loading || (isVoted && isVoted.id !== miss.id)} onClick={() => handleVote()} className={miss.isVote[category.slug] ? 'btn-success' : ''}>
              {!loading ? miss.isVote[category.slug] ? 'Voted' : 'Vote' : null} {miss.isVote[category.slug] && !loading && <i className="fa-regular fa-circle-check"></i>} {loading && <span className="loading loading-spinner loading-xs"></span>}
            </ButtonCommon>
          )}
        </div>
      </div>

    </div>
  )
}

export default MissCard;
